"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { motion } from "@repo/ui";

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
