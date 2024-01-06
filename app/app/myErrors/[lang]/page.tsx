import React from "react"

import {
  SupabaseClient,
  createServerComponentClient
} from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
export const dynamic = "force-dynamic"

import pythonLogo from "@/images/python.png"
import csharpLogo from "@/images/csharp.png"
import javaLogo from "@/images/java.png"
import tsLogo from "@/images/ts.png"
import Image from "next/image"
import { Typography } from "@/ui/index"
import { ILangObj } from "@/app/types/Lang"
import AvailableLangList from "@/app/util/AvailableLangList"

type ChartData = {
  errorName: string
  count: number
}

const getLangImage = (currentLangName: string) => {
  return AvailableLangList.find((lang) => currentLangName == lang.name)?.image
}

async function fetchData(supabase: SupabaseClient, lang: string) {
  try {
    let { data: errors, error } = await supabase
      .from("errors")
      .select("*")
      .eq("lang", lang.toLowerCase())
    return errors
  } catch (error) {
    console.log(error)
  }
}

async function MyErrorsInLang({
  params: { lang: currentLangName }
}: {
  params: { lang: string }
}) {
  const supabase = createServerComponentClient({ cookies })

  const errors = await fetchData(supabase, currentLangName)

  let lang: any = AvailableLangList.find((lang) => currentLangName == lang.name)

  const image = getLangImage(currentLangName)
  let errorCount: ChartData[] = []

  errors?.forEach((_: any) => {
    if (_.lang == currentLangName.toLowerCase()) {
      var index = errorCount.findIndex(({ errorName }) => errorName == _.code)
      index == -1
        ? errorCount.push({ errorName: _.code, count: 1 })
        : errorCount[index].count++
    }
  })

  return (
    <div className='container flex flex-col space-y-8'>
      <header className='flex items-center justify-center gap-2'>
        <h2 className='text-4xl'>
          <Image
            className='inline-block'
            src={image}
            width={64}
            height={64}
            alt='lang logo'
          />{" "}
          Errors{" "}
        </h2>
      </header>

      <section>
        <table className='w-full min-w-max table-auto text-left overflow-scroll'>
          <thead>
            <tr>
              {/* <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                >
                  At Line
                </Typography>
              </th> */}
              <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                >
                  Error Name
                </Typography>
              </th>
              <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                >
                  Count
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {errorCount.map((error: ChartData, index: number) => (
              <tr key={index}>
                <td className='border px-4 py-2'>{error.errorName}</td>
                <td className='border px-4 py-2'>{error.count}</td>
              </tr>
            ))}

            {/* {errors?.map((error: any, index: number) => {
              return (
                <tr key={index}>
                  <td className='border px-4 py-2'>{error.line}</td>
                  <td className='border px-4 py-2'>{error.code}</td>
                  <td className='border px-4 py-2'>{error.message}</td>
                </tr>
              )
            })} */}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default MyErrorsInLang
