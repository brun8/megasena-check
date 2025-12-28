import { getResult } from "@/lib/utils"

async function main() {
  const res = await getResult("3480")
  console.log(res)
}

main()
