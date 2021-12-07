import { User } from "./models/User";



const user = new User({ id: 4 });
user.fetch()

user.set({ name: "Another Test anammme" })
// user.set({ age: 25 })
user.save();
