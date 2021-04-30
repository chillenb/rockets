
function makeKeyDownHandler(keyState) {
    return (event) => {
        switch (event.code) {
            case "KeyW":
                keyState.w_down = true;
                break;
            case "KeyS":
                keyState.s_down = true;
                break;
            case "KeyD":
                keyState.d_down = true;
                break;
            case "KeyA":
                keyState.a_down = true;
                break;
        }
        event.preventDefault();
    }
}

function makeKeyUpHandler(keyState) {
    return (event) => {
        switch (event.code) {
            case "KeyW":
                keyState.w_down = false;
                break;
            case "KeyS":
                keyState.s_down = false;
                break;
            case "KeyD":
                keyState.d_down = false;
                break;
            case "KeyA":
                keyState.a_down = false;
                break;
        }
        event.preventDefault();
    }
}

 export { makeKeyDownHandler, makeKeyUpHandler };