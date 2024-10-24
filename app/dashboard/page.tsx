import React from 'react';
import { Navbar } from '@/app/components/Navbar';
// Import the necessary components for tabs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Import the DatePickerWithRange component
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { StatsCard } from "@/app/components/StatsCard"
import statsData from "@/app/data/statsData";
import { DataTable } from "@/app/components/data-table";



type AvailableLeadsData = {
  loanAmount: string;
  term: string;
  creditScore: string;
  currentRate: string;
};

type ActiveLeadsData = {
  name: string;
  phone: string;
  email: string;
  address: string; 
  amount: string;
  term: string;
  rate: string;
  status: string;
  
};


// Use the ActionCell component in the column definition
const availableLeadsColumns = [
  { accessorKey: 'loanAmount', header: 'Loan Amount' },
  { accessorKey: 'term', header: 'Term' },
  { accessorKey: 'creditScore', header: 'Credit Score' },
  { accessorKey: 'currentRate', header: 'Rate' }
];

// function handleUseBid(data: AvailableLeadsData) {
//   // Implement the logic for using a bid
//   console.log('Using bid for:', data);
// }

const activeLeadsColumns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'phone', header: 'Phone' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'address', header: 'Address' }, 
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'term', header: 'Term' },
  { accessorKey: 'rate', header: 'Rate' },
  { accessorKey: 'status', header: 'Status' },
];

const availableLeadsData: AvailableLeadsData[] = Array(6).fill({
  loanAmount: '$250,000',
  term: '30 yrs',
  creditScore: '720',
  currentRate: '3.5%'
});
// .concat(Array(5).fill({
//   loanAmount: '$220,000',
//   term: '30 yrs',
//   creditScore: '720',
//   currentRate: '3.5%'
// }));

const activeLeadsData: ActiveLeadsData[] = Array(8).fill({
  name: 'John Doe',
  phone: '123-456-7890',
  email: 'john@example.com',
  address: '123 Main St',
  amount: '$300,000',
  term: '30 yrs',
  rate: '3.5%',
  status: 'OK'
});

export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="mx-4 my-4">
        <div className="flex justify-between items-center">
          <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Dashboard
          </h2>
          <DatePickerWithRange />
        </div>
        <Tabs defaultValue="tables" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {/* Overview content goes here */}
          </TabsContent>
          <TabsContent value="tables">
            {/* Tables content goes here */}
          </TabsContent>
          <TabsContent value="reports">Reports content goes here.</TabsContent>
          <TabsContent value="notifications">Notifications content goes here.</TabsContent>
        </Tabs>
        <div className="flex flex-wrap lg:flex-row justify-center gap-4 w-full">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              {...stat}
              typeOf={stat.typeof}
              className="flex-grow w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-2 flex flex-col shadow-none hover:shadow-md transition-shadow ease-in-out duration-300"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-start my-8 mx-4 gap-4 w-full">
        <div className="w-half">
          <h3 className="text-xl font-semibold">Available Leads Summary</h3>
          <p className="text-sm text-blue-500 mb-4">
            <a href="/available-leads">View all available leads</a>
          </p>
          <DataTable columns={availableLeadsColumns} data={availableLeadsData} typeOf="action-table" />
        </div>
        <div className="w-half">
          <h3 className="text-xl font-semibold">Active Leads Summary</h3>
          <p className="text-sm text-blue-500 mb-4">
            <a href="/active-leads">View all active leads</a>
          </p>
          <DataTable columns={activeLeadsColumns} data={activeLeadsData} />
        </div>
      </div>
    </div>
  );
}
