import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/util/db";

export async function POST(req: NextRequest) {
  try {
    const { username, browser, title, description, device, mobileOS } =
      await req.json();

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const insertQuery = `
        INSERT INTO bug_reports (username, browser, title, description, device, mobile_os)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      const values = [
        username,
        browser,
        title,
        description,
        device,
        mobileOS || null,
      ];
      const result = await client.query(insertQuery, values);
      await client.query("COMMIT");

      return NextResponse.json(
        { message: "Bug report submitted successfully", id: result.rows[0].id },
        { status: 201 },
      );
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error submitting bug report:", error);
    return NextResponse.json(
      {
        message: "Error submitting bug report",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
