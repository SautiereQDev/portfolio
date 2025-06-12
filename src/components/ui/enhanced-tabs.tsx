import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { cn } from "../../lib/utils";

interface EnhancedTabsProps {
  tabs: {
    id: string;
    label: string;
    badge?: string;
    content: React.ReactNode;
  }[];
  defaultValue?: string;
  className?: string;
}

/**
 * Enhanced Tabs component using shadcn/ui
 * Provides additional features like badges and better styling
 */
export const EnhancedTabs = ({
  tabs,
  defaultValue,
  className,
}: EnhancedTabsProps) => {
  return (
    <Tabs
      defaultValue={defaultValue ?? tabs[0]?.id}
      className={cn("w-full", className)}
    >
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="relative">
            {tab.label}
            {tab.badge && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {tab.badge}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          <Card>
            <CardContent className="space-y-2 pt-6">{tab.content}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default EnhancedTabs;
