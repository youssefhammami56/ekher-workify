"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { intervalToDuration } from "date-fns";

export async function getmygigsincludetheirrevneue() {
  const user = await auth();
  const userId = user?.user.id;

  const gigs = await db.gigs.findMany({
    where: {
      Orders: {
        some: {
          completedAt: {
            not: null,
          },
        },
      },

      createdBy: {
        id: userId,
      },
    },
    include: {
      Orders: {
        where: {
          completedAt: {
            not: null,
          },
        },
      },
    },
  });
  const gigswithrevneue = await Promise.all(
    //@ts-ignore
    gigs.map(async (gig) => {
      //@ts-ignore
      const orders = gig.Orders;

      let difrecnebetwenstardateandendate = 0;
      let revenue = 0;
      let intervall = 0;
      //@ts-ignore
      orders.map((order) => {
        //@ts-ignore
        if (!order.completedAt) return console.log("order not completed");
        //@ts-ignore

        const interval = intervalToDuration({
          //@ts-ignore
          start: order.startedAt!,
          //@ts-ignore
          end: order.completedAt!,
        });
        //@ts-ignore
        if (!interval.months) {
          //@ts-ignore
          const revneue = order.price * interval.days!;
          //@ts-ignore
          revenue += revneue;
          //@ts-ignore
          difrecnebetwenstardateandendate += interval.days!;
          //@ts-ignore
          intervall += interval.days!;
        }
        //@ts-ignore
        if (interval.months) {
          //@ts-ignore
          const revneue =
            //@ts-ignore
            order.price * interval.months! * 30 + order.price * interval.days!;
          //@ts-ignore
          revenue += revneue;
          //@ts-ignore
          difrecnebetwenstardateandendate += interval.days!;
          //@ts-ignore
          intervall += interval.months! * 30 + interval.days!;
        }
      });
      //@ts-ignore
      return {
        ...gig,
        revenue,
        intervall,
      };
    })
  );
  //@ts-ignore

  return gigswithrevneue;
}
