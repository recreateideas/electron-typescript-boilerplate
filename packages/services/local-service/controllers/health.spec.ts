import "../__mocks__";
import { Request, Response } from "express";
import health from "./health";

const req = {} as any | Request;

const res = {
  status: jest.fn().mockImplementation(() => ({
    send: jest.fn(),
    json: jest.fn(),
  })),
  send: jest.fn(),
  json: jest.fn(),
} as any | Response;

describe("healthCheck", () => {
  it("should always return 200 when hit", async (done) => {
    await health.healthCheck(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    done();
  });
});
