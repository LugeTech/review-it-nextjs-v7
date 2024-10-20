import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/util/db";

export async function GET(req: NextRequest) {
  try {
    const client = await pool.connect();
    try {
      const selectQuery = `
        SELECT * FROM bug_reports
        ORDER BY created_at DESC
      `;
      const result = await client.query(selectQuery);

      return NextResponse.json(
        {
          message: "Bug reports retrieved successfully",
          bugReports: result.rows,
        },
        { status: 200 },
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error retrieving bug reports:", error);
    return NextResponse.json(
      {
        message: "Error retrieving bug reports",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
