import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserForm } from "./views/UserForm";


const userCollection: Collection<User, UserProps> = User.buildCollection();
const user = new User({ id: 2, name: "serhat", age: 25, isAdmin: true })
userCollection.fetch();

const parentElement = document.getElementById("app");
const userForm = new UserForm(parentElement, user);

userForm.render();


