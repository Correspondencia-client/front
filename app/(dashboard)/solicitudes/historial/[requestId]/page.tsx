"use client"

import { use } from 'react'

export default function RequestHistoryPage({
  params,
}: {
  params: Promise<{ requestId: string }> 
}) {
   const { requestId } = use(params)

  return <div>ID de la request: {requestId}</div>;
}
