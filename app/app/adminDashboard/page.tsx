import React from "react";
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Button } from "@/ui/index";
import Link from "next/link";
import Image from "next/image";
import pylogo from "@/images/python.png";

async function fetchData(supabase: SupabaseClient, companyMail?: string) {
  try {
    let { data: errors, error } = await supabase
      .from("users")
      .select("*")
      .like("email", "%" + companyMail + "%");
    return errors;
  } catch (error) {
    console.log(error);
  }
}

async function adminDashboard() {
  const supabase = createServerComponentClient({ cookies });

  const session = await supabase.auth.getSession();

  if (session.data.session === null) {
    return <div>Unauthorized</div>;
  }

  var companyMail = session.data.session.user.email?.split("@")[1];
  const employeeLists = await fetchData(supabase, companyMail);
  console.log(employeeLists);
  return (
    <div className="container grid grid-cols-2 items-center justify-items-center gap-8">
      <div>
        <Link href="/adminDashboard/py">
          <Button
            ripple={true}
            variant="outlined"
            className="text-4xl flex gap-4 justify-center items-center text-gray-800"
          >
            <Image width={48} height={48} src={pylogo} alt="py logo" />
            <h3>Python</h3>
          </Button>
        </Link>
      </div>
      <div>
        <Link href="/adminDashboard/newEmployee">
          <Button
            ripple={true}
            variant="outlined"
            className="text-4xl flex gap-4 justify-center items-center text-gray-800"
          >
            Create New Employee
          </Button>
        </Link>
      </div>
      <div>
        <Link href="/adminDashboard/py">
          <Button
            ripple={true}
            variant="outlined"
            className="text-4xl flex gap-4 justify-center items-center text-gray-800"
          >
            <Image width={48} height={48} src={pylogo} alt="py logo" />
            Python
          </Button>
        </Link>
      </div>
      <div>
        <Link href="/adminDashboard/py">
          <Button
            ripple={true}
            variant="outlined"
            className="text-4xl flex gap-4 justify-center items-center text-gray-800"
          >
            <Image width={48} height={48} src={pylogo} alt="py logo" />
            Python
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default adminDashboard;
