import mongoose, { Schema, Document, model, Model } from "mongoose";

export interface ITodo extends Document {
    todoName: String;
    status: Boolean;
    startTime: Date;
    postedBy: String;
    endTime: Date;
    description: String;
    priority: String;
}

let TodoSchema = new Schema<ITodo>({
    todoName: {
        type: String,
        required: "Todo Name is required",
    },
    description: {
        type: String,
        required: "description is required",
    },
    priority: {
        type: String,
        enum: [
            "high",
            "low", 
            "meduim"
        ]
    },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {
        type: Boolean,
        default: false
    },
    startTime: {
        type: Date,
        required: "StartTime is required",
    },
    endTime: {
        type: Date,
        required: " endTime is required",
    }
},{
    emitIndexErrors: true,
    autoIndex: true,
  })

  TodoSchema.index(
    {
      todoName: "text",
      priority: "text",
    },
    {
      name: "searchIndex",
    }
  );



interface TodoSchemaDoc extends ITodo, Document {}

const TodoModel: Model<TodoSchemaDoc> = model<TodoSchemaDoc>(
  "Todo",
  TodoSchema
);

TodoModel.on("index", function (err) {
    if (err) {
      console.log("ERROR", err);
    }
  });
  
TodoModel.ensureIndexes();

export default TodoModel;