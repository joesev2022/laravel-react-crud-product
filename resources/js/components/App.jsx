import React from 'react';
import Router from '../router/router';

import Swal from 'sweetalert2';

window.Swal = Swal
const toast = Swal.mixin({
    toast:true,
    position:'top-end',
    showConfirmButton:false,
    timer:3000,
    timerProgressBar:true,
})
window.toast = toast

const App = () => {
    return (
        <div>
            <Router />
        </div>
    );
}

export default App;
