import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "./Loading";

const SearchSort = ({ setFilteredLessons }) => {
  const axiosSecure = useAxiosSecure();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["publicLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons`);

      return res.data;
    },
  });

  // 🔍 FILTER + SEARCH
  useEffect(() => {
    const filtered = lessons.filter((lesson) => {
      const matchTitle = lesson.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchCategory =
        categoryFilter === "All" || lesson.tone === categoryFilter;

      return matchTitle && matchCategory;
    });

    setFilteredLessons(filtered);
  }, [lessons, searchText, categoryFilter, setFilteredLessons]);
  const categories = ["All", ...new Set(lessons.map((lesson) => lesson.tone))];
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="my-15">
      {/* ------- */}
      <div className="flex justify-between md:gap-35 flex-col md:flex-row gap-4 mb-8">
        {/* Search---> */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered dark:bg-gray-600 dark:text-white w-full md:w-72"
        />
        {/* Filter---> */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select dark:bg-gray-600 dark:text-white font-semibold select-bordered"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      
      {/* ----------------- */}
    </div>
  );
};

export default SearchSort;
