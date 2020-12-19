import request from "supertest";
import app from "../app";
const makeRequest = request(app);

let id;
let userToken;
let InvalidToken;
let invalidRefreshToken = "nfjfnkrfmfkmkmfkmffmmfmmf";
let refreshToken;
let todoId;

export default () => {
  describe("Todo Management", () => {
    test("should authenticate an admin", async (done) => {
      const res: any = await makeRequest.post("/api/auth/signin").send({
        email: "freeman@gmail.com",
        password: "password",
      });
      userToken = res.body.results[0].accessToken;
      expect((res as any).status).toBe(200);
      expect((res as any).body.message).toBe("Successfully logged In");
      done();
    });

    test("should create a todo", async (done) => {
      const res: any = await makeRequest
        .post("/api/todos")
        .send({
          "todoName": "Create A Book1",
          "description": "Creating the lord of the rings book",
          "priority": "low",
          "startTime": "2021-11-26T16:24:32.674+00:00",
          "endTime":  "2022-11-26T16:24:32.674+00:00"
      })
        .set("authorization", `Bearer ${userToken}`);

      todoId = res.body.results["_id"];

      expect((res as any).status).toBe(201);
      expect((res as any).body.message).toBe("Todo successfully created");
      done();
    });

    

    test("should view a single todo", async (done) => {
      const res: any = await makeRequest
        .get(`/api/todos/${todoId}`)
        .set("authorization", `Bearer ${userToken}`);

      expect((res as any).status).toBe(200);

      done();
    });

    test("should return 404 if todo not found", async (done) => {
      const res: any = await makeRequest
        .get(`/api/todos/5f7a180d365e79530a826515`)
        .set("authorization", `Bearer ${userToken}`);

      expect((res as any).status).toBe(404);
      expect((res as any).body.message).toBe("Todo not found");

      done();
    });

    test("should view all todo", async (done) => {
      const res: any = await makeRequest
        .get(`/api/todos/`)
        .set("authorization", `Bearer ${userToken}`);

      expect((res as any).status).toBe(200);
      expect((res as any).body.message).toBe("Successfully  fetched all todos");
      done();
    });

    test("should edit a particular todo", async (done) => {
      const res: any = await makeRequest
        .put(`/api/todos/${todoId}`)
        .send({
          "todoName": "Update A Book2",
          "description": "Creating the lord of the rings book",
          "priority": "low",
          "startTime": "2021-11-26T16:24:32.674+00:00",
          "endTime":  "2022-11-26T16:24:32.674+00:00"
      })
        .set("authorization", `Bearer ${userToken}`);

      expect((res as any).status).toBe(200);
      expect((res as any).body.message).toBe("Successfully updated the todo");
      done();
    });

    test("should delete a particular todo", async (done) => {
      const res: any = await makeRequest
        .delete(`/api/todos/${todoId}`)
        .set("authorization", `Bearer ${userToken}`);

      expect((res as any).status).toBe(200);
      expect((res as any).body.message).toBe("Successfully deleted the todo");
      done();
    });

    test("should return 404 when deleting a todo that does not exist", async (done) => {
      const res: any = await makeRequest
        .delete(`/api/todos/5f7b180d365e79530a826515`)
        .set("authorization", `Bearer ${userToken}`);

      expect((res as any).status).toBe(404);
      expect((res as any).body.message).toBe("Todo not Found");
      done();
    });

    test("should search for a particular todo by query", async (done) => {
      const res: any = await makeRequest.get(`/api/todos/search?q=low`);

      expect((res as any).status).toBe(200);
      expect((res as any).body.message).toBe(
        "Successfully  fetched search results"
      );
      done();
    });
  });
};
