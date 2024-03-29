"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Task must have a name"],
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
    priority_level: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
    status: {
        type: String,
        enum: ["completed", "ongoing", "pending"],
        default: "pending",
    },
    start_date: {
        type: Date,
        default: Date.now(),
        required: [true, "Start date is required"],
    },
    user: {
        type: String,
        required: [true, "Task must belong to a user"],
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.default = mongoose_1.default.model("Todo", schema);
