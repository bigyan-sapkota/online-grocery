import { useState } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { FunnelIcon, MoveRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "recent");
  const [priceLte, setPriceLte] = useState(searchParams.get("price_lte") || "");
  const [priceGte, setPriceGte] = useState(searchParams.get("price_gte") || "");

  const applyFilterHandler = () => {
    const params = new URLSearchParams();

    if (category === "all") params.delete("category");
    else params.set("category", category);

    if (sort === "recent") params.delete("sort");
    else params.set("sort", sort);

    if (priceGte === "") params.delete("price_gte");
    else params.set("price_gte", priceGte);

    if (priceLte === "") params.delete("price_lte");
    else params.set("price_lte", priceLte);
    console.log("paarams", params);

    setSearchParams(params);
  };

  const resetFilterHandler = () => {
    setCategory("all");
    setSort("recent");
    setPriceLte("");
    setPriceGte("");
  };

  return (
    <aside>
      <div className="space-y-5">
        <div className="space-y-3">
          <Label className="font-semibold">Category : </Label>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="font-semibold">Sort Product By : </Label>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Sort Product By" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="recent">Newest</SelectItem>
              <SelectItem value="title_asc">
                Title A <MoveRightIcon />Z
              </SelectItem>
              <SelectItem value="title_desc">
                Title Z <MoveRightIcon />A
              </SelectItem>
              <SelectItem value="price_asc">
                Price High <MoveRightIcon />
                Low
              </SelectItem>
              <SelectItem value="price_desc">
                Price Low <MoveRightIcon />
                High
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="font-semibold">Price Range : </Label>

          <div className="mt-3 flex gap-4">
            <Input
              min={1}
              value={priceLte}
              placeholder="Min"
              type="number"
              onChange={(e) => {
                const value = e.target.value;

                if (Number(value) <= 0) return;

                setPriceLte(value);
              }}
              className="bg-white"
            />
            <Input
              value={priceGte}
              placeholder="Max"
              type="number"
              onChange={(e) => setPriceGte(e.target.value)}
              className="bg-white"
            />
          </div>
        </div>

        <div>
          <Button className="w-full" onClick={applyFilterHandler}>
            <FunnelIcon />
            Apply Filter
          </Button>

          <Button
            type="button"
            className="mt-2 w-full"
            variant="outline"
            onClick={resetFilterHandler}
          >
            Clear Filter
          </Button>
        </div>
      </div>
    </aside>
  );
}
