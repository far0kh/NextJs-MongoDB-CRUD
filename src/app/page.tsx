"use client";

import EditUser from "@/components/EditUser";
import Loading from "@/components/Loading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { User } from "@/models/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

async function deleteUser(id: string) {
  const response = await axios.delete(`/api/user/${id}`);
  return response.data;
}

export default function Home() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  const { isLoading, error, data, refetch } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetch("/api/user").then((res) => res.json())
  });

  async function handelDelete(id: string) {
    const res = await mutateAsync(id);
    toast({
      description: res.message
    });
    refetch();
  }

  return (
    <main className="flex items-center justify-betweenv px-8 py-5">
      {isLoading && <Loading />}
      {data && (
        <Table>
          <TableCaption>A list of your recent Users.</TableCaption>
          <TableHeader>
            <TableRow className="h-12">
              <TableHead>User</TableHead>
              <TableHead>Bio</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d._id}>
                <TableCell className="font-medium"> {d.name}</TableCell>
                <TableCell>{d.bio}</TableCell>
                <TableCell className="flex items-center gap-4 pt-4">
                  <EditUser data={d} />

                  <Trash
                    onClick={() => handelDelete(d._id)}
                    className=" text-red-400 cursor-pointer hover:opacity-80"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
