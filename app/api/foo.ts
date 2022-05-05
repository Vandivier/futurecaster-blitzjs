import { NextApiRequest, NextApiResponse } from "next"

// sanity check api works / health check kinda
export default function mint(req: NextApiRequest, res: NextApiResponse): void {
  res.status(200).json({ bar: 1 })
}
