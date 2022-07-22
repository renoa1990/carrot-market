import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "anonumous",
      ...payload,
    },
    update: {
      // ... in case it already exists, update
    },
  });

  console.log(user);
  return res.json({ ok: true });
}

export default withHandler("POST", handler);
