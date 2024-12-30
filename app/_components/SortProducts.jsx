import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SortProducts({ onSortChange }) {
  const List = [
    {
      label: "NEWEST",
      field: "id",
      order: "desc",
    },
    {
      label: "PRICE (Low to High)",
      field: "price",
      order: "asc",
    },
    {
      label: "PRICE (High to Low)",
      field: "price",
      order: "desc",
    },
    // {
    //   label: "Most Viewed",
    //   field: "views", // Adjust field to reflect actual database column
    //   order: "desc",
    // },
  ];

  return (
    <div>
      <Select
        onValueChange={(value) => {
          const selectedSort = List.find((item) => item.label === value);
          if (selectedSort) onSortChange(selectedSort); // Pass the full object
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {List.map((item, index) => (
            <SelectItem key={index} value={item.label}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortProducts;
