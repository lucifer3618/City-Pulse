import React, { useState, useEffect } from 'react';
import { LucideEye, LucideHeart, LucideThermometer, LucideTrendingUp, LucideWind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import apiClient from "@/api/apiClient.js";

const categoryConfig = {
  'Air Quality': { color: 'text-blue-500', icon: LucideWind },
  'Weather': { color: 'text-yellow-500', icon: LucideThermometer },
  'Health': { color: 'text-red-500', icon: LucideHeart },
  'Environment': { color: 'text-green-600', icon: LucideEye },
  'Overall': { color: 'text-purple-500', icon: LucideTrendingUp }
};

function InsightCard({ cityId }) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState(null);

  // treat cityId as a simple identifier (no complex derivation)
  useEffect(() => {
    let mounted = true;

    if (!cityId) {
      if (mounted) {
        setInsights([]);
        setError(null);
        setLoading(false);
      }
      return () => { mounted = false; };
    }

    const load = async () => {
      if (mounted) {
        setLoading(true);
        setError(null);
      }

      try {
        const res = await apiClient.get(
          `/api/v1/cities/insights/${cityId}`,
          { withCredentials: true }
        );

        const data = res?.data;
        let list = [];
        console.log(data);

        // simple parsing: array or { insights: [...] } or single object
        if (Array.isArray(data)) list = data;
        else if (Array.isArray(data?.insights)) list = data.insights;
        else if (data && typeof data === 'object' && (data.message || data.category)) list = [data];
        else list = [];

        if (mounted) setInsights(list);
      } catch (err) {
        const msg = err?.response?.data?.message ?? err?.response?.data ?? err?.message ?? "Error fetching insights";
        if (mounted) {
          setError(typeof msg === 'string' ? msg : JSON.stringify(msg));
          setInsights([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [cityId]);

  return (
    <div className="w-full h-full">
      <Card className="h-full flex flex-col bg-green-50 border-border shadow-sm drop-shadow-accent">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-card-foreground mb-[-15px]">
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="
          flex-1
          overflow-y-auto
          pr-4
          space-y-4
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-600
        ">
          <div className="space-y-4">

            {!cityId && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Select a city to view AI insights.
              </div>
            )}

            {cityId && loading && Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-full flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
                <Skeleton circle height={27} width={27} />
                <div className="flex-1 flex-row min-w-0 space-y-2">
                  <Skeleton height={18} width="40%" />
                  <Skeleton height={14} width="100%" />
                </div>
              </div>
            ))}

            {cityId && !loading && error && (
              <div className="py-4 text-sm text-red-500">
                Failed to load insights: {error}
              </div>
            )}

            {cityId && !loading && !error && insights.length === 0 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No insights available for this city.
              </div>
            )}

            {cityId && !loading && !error && insights.length > 0 &&
              insights.map((insight, index) => {
                const config = categoryConfig[insight.category] ?? {
                  color: 'text-muted-foreground',
                  icon: LucideTrendingUp
                };
                const Icon = config.icon;

                return (
                  <div key={index} className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
                    <Icon className={`w-6 h-6 mt-0.5 flex-shrink-0 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[18px] font-medium text-foreground mb-1">
                        {insight.category || 'Insight'}
                      </p>
                      <p className="text-[14px] text-muted-foreground leading-relaxed">
                        {insight.message || insight.text || insight.description || 'No details available.'}
                      </p>
                    </div>
                  </div>
                );
              })
            }

          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InsightCard;
