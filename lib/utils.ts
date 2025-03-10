import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { PlanName } from "@/types/enums";
import { featureRouteMap } from "@/utils/constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(isoDate: string): string {
  return format(parseISO(isoDate), "MMM dd yyyy hh:mm a");
}

export const isEmptyObject = (obj: object | undefined | null): boolean => {
  if (obj === undefined || obj === null) return true;
  return Object.keys(obj).length === 0;
};

export function isMobile() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  const isSmallScreen = window.matchMedia("(max-width: 600px)").matches;

  return isTouchDevice && isSmallScreen;
}

export function getUserFriendlyPlanName(
  planName: PlanName
): string | undefined {
  const userFriendlyPlanNameMap = new Map<PlanName, string>([
    [PlanName.FREE, "Free"],
    [PlanName.SOCIAL_PORTAL, "Social Portal"],
    [PlanName.AI_STUDIO, "AI Studio"],
    [PlanName.AUTOMATION_HUB, "Automation Hub"],
    [PlanName.BUSINESS, "Business"],
    [PlanName.AI_ESSENTIALS, "AI Essentials"],
  ]);

  const userFriendlyPlanName = userFriendlyPlanNameMap.get(planName);

  return userFriendlyPlanName;
}

export const planIdsMap: Record<PlanName, string[]> = {
  [PlanName.FREE]: ["grs/free"],
  [PlanName.SOCIAL_PORTAL]: [
    "grs/creator/monthly_planjh4qViTCP2gsvT",
    "grs/creator/yearly_planWfodY4MFnK074E",
  ],
  [PlanName.AI_STUDIO]: [
    "grs/pro/monthly_plan002mLAqmLKnWAk",
    "grs/pro/yearly_plan8OT7i48BejFfMI",
  ],
  [PlanName.AUTOMATION_HUB]: [
    "grs/advanced_pro/monthly_planIsLCnfld6wkjWB",
    "grs/advanced_pro/yearly_planlsjArmd2EoVuhr",
  ],
  [PlanName.BUSINESS]: [
    "grs/business/monthly_planhsPv4QB1ZZ1vS1",
    "grs/business/yearly_plannB1eoCa7NOhmfh",
  ],
  [PlanName.AI_ESSENTIALS]: [
    "grs/basic_plan",
    "grs/basic/yearly_planyrwjxt3Jh4i3iU",
  ],
};

export const hasAccessToRoute = (
  currentPlanUsage: any,
  pathname: string
): boolean => {
  let routeExistsInMap = false;

  for (const feature in featureRouteMap) {
    const routes = featureRouteMap[feature];

    for (const route of routes) {
      let matches = false;

      if (route.partialMatch) {
        const pathRegex = new RegExp(route.path.replace(/:[^\s/]+/g, "[^/]+"));
        matches = pathRegex.test(pathname);
      } else {
        matches = route.path === pathname;
      }

      if (matches) {
        routeExistsInMap = true;

        if (route?.excepts) {
          for (const except of route.excepts) {
            const ancestorPathRegex = new RegExp(
              `${except.ancestorRoute}(\\/[^/]+)?$`
            );

            if (ancestorPathRegex.test(pathname)) {
              for (const exceptPath of except.exceptPath) {
                const exceptRegex = new RegExp(
                  exceptPath.replace(/:[^\s/]+/g, "[^/]+")
                );

                if (exceptRegex.test(pathname)) {
                  return true;
                }
              }
            }
          }
        }

        if (currentPlanUsage[feature]) {
          return true;
        }
      }
    }
  }

  if (!routeExistsInMap) {
    return true;
  }

  return false;
};

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function parseJsonString(str: string): any {
  try {
    return JSON.parse(str);
  } catch (e) {
    return "";
  }
}
