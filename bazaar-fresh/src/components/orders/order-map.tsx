"use client";

import { useI18n } from "@/i18n/provider";

const P0 = { x: 70, y: 168 };
const P1 = { x: 190, y: 18 };
const P2 = { x: 330, y: 84 };

function pointAt(t: number) {
  const a = (1 - t) ** 2;
  const b = 2 * (1 - t) * t;
  const c = t ** 2;
  return { x: a * P0.x + b * P1.x + c * P2.x, y: a * P0.y + b * P1.y + c * P2.y };
}

/** Stylised live map: store → rider → home. `progress` is 0–1 along the route. */
export function OrderMap({ progress, showRider }: { progress: number; showRider: boolean }) {
  const { t } = useI18n();
  const rider = pointAt(progress);
  const route = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`;

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-[#eef3ec]" dir="ltr">
      <svg viewBox="0 0 400 220" className="block h-auto w-full" role="img" aria-label={`${t("order.mapStore")} → ${t("order.mapHome")}`}>
        {/* City blocks and roads */}
        <g fill="#dfe8dc">
          <rect x="10" y="12" width="90" height="60" rx="10" />
          <rect x="120" y="96" width="70" height="52" rx="10" />
          <rect x="230" y="130" width="100" height="70" rx="10" />
          <rect x="300" y="14" width="88" height="40" rx="10" />
          <rect x="16" y="196" width="120" height="40" rx="10" />
        </g>
        <circle cx="250" cy="70" r="26" fill="#cfe3c9" />
        <g stroke="#ffffff" strokeWidth="14" strokeLinecap="round" fill="none">
          <path d="M -10 88 L 410 120" />
          <path d="M 210 -10 L 180 230" />
          <path d="M 0 180 L 400 170" />
        </g>
        {/* Route */}
        <path d={route} fill="none" stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 10" />
        <path
          d={route}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={`${progress} 1`}
          className="transition-[stroke-dasharray] duration-1000 ease-linear"
        />
        {/* Store */}
        <g transform={`translate(${P0.x} ${P0.y})`}>
          <circle r="16" fill="var(--primary)" />
          <text y="5" textAnchor="middle" fontSize="15">
            🏪
          </text>
          <text y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15201a">
            {t("order.mapStore")}
          </text>
        </g>
        {/* Home */}
        <g transform={`translate(${P2.x} ${P2.y})`}>
          <circle r="16" fill="var(--deal)" />
          <text y="5" textAnchor="middle" fontSize="15">
            🏠
          </text>
          <text y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15201a">
            {t("order.mapHome")}
          </text>
        </g>
        {/* Rider */}
        {showRider && (
          <g style={{ transform: `translate(${rider.x}px, ${rider.y}px)` }} className="transition-transform duration-1000 ease-linear">
            <circle r="22" fill="var(--primary)" opacity="0.15">
              <animate attributeName="r" values="16;26;16" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="15" fill="#ffffff" stroke="var(--primary)" strokeWidth="2" />
            <text y="5" textAnchor="middle" fontSize="15">
              🛵
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
