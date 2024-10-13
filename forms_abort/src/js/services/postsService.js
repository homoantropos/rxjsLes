import config from "../config/config";
import {ajax} from "rxjs/internal/ajax/ajax";
import {delay, map} from "rxjs";

class PostsService {
    postApiUrl = config.server + 'posts';

    createPost(post) {
        if(post)
        return ajax.post(this.postApiUrl, post).pipe(
            delay(1000),
            map((value) => value.response)
        )
    }

    getPost(id) {

    }

    getPosts() {
        return ajax.getJSON(this.postApiUrl);
    }

    deletePost(id) {

    }
}

const postsService = new PostsService();

export default postsService;