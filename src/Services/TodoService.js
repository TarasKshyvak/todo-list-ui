import axios from "axios";
import { routes } from "../Helpers/Routes";

export default class TodoService {
    static async getActual() {
        const response = await axios.get(routes.api + routes.todos + '/actual')
                                    .catch(function (error) {
                                        console.log(error);
                                    });

        return response;
    }

    static async addNewTodo(todoModel) {
        const response = await axios.post(routes.api + routes.todos, todoModel, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => console.log(error));
        return response;
    }

    static async setDone(id) {
        const response = await axios.put(routes.api + routes.todos + `/done/${id}`, id, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => console.log(error));
        return response;
    }

    static async setUndone(id) {
        const response = await axios.put(routes.api + routes.todos + `/undone/${id}`, id, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => console.log(error));
        return response;
    }

    static async setArchived(id) {
        await axios.put(routes.api + routes.todos + `/archive/${id}`, id, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => console.log(error));
    }
}