import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserListing from "./_components/UserListing";
import PurchaseHistory from "./_components/PurchaseHistory";
import Analytics from "./_components/Analytics";

function Dashboard() {
  return (
    <div className="mt-16">
      <h2 className="font-bold text-2xl">Dashboard</h2>

      <Tabs defaultValue="listing" className="mt-5">
        <TabsList>
          <TabsTrigger value="listing">Listing</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="purchase">Purchase</TabsTrigger>
        </TabsList>
        <TabsContent value="listing">
          <UserListing/>
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics/>
        </TabsContent>
        <TabsContent value="purchase"><PurchaseHistory/></TabsContent>
      </Tabs>
    </div>
  );
}

export default Dashboard;
