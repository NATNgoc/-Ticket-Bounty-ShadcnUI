import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbItemType } from "@/types";
import clsx from "clsx";
import { Fragment } from "react";

type BreadCumbWithListProps = {
  listItems: BreadcrumbItemType[];
};

export function BreadCumbWithList({ listItems }: BreadCumbWithListProps) {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {listItems?.map((item) => {
            return (
              <Fragment key={item.title}>
                <BreadcrumbItem
                  className={clsx("", {
                    "font-semibold": !item.href,
                  })}
                >
                  {item.href ? (
                    <BreadcrumbLink href={item.href}>
                      {item.title}
                    </BreadcrumbLink>
                  ) : (
                    item.title
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="my-5"></Separator>
    </div>
  );
}
