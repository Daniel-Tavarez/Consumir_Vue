const d = document,
$table = d.querySelector(".crud-table"),
$form = d.querySelector(".crud-form"),
$title = d.querySelector(".crud-title"),
$template = d.getElementById("crud-template").content,
$fragment = d.createDocumentFragment();

const getAll = async() => {
    try{
        let res = await fetch("http://localhost:33495/api/cities/1/pointsofinterest"),
        json = await res.json();

        if(!res.ok) throw {status: res.status,statusText: res.statusText};

        console.log(json)

        json.forEach(el => {

          $template.querySelector(".id").textContent = el.id;
          $template.querySelector(".name").textContent = el.name;
          $template.querySelector(".description").textContent = el.description;

          $template.querySelector(".edit").dataset.id = el.id;
          $template.querySelector(".edit").dataset.name = el.name;
          $template.querySelector(".edit").dataset.description = el.description;

          $template.querySelector(".delete").dataset.id = el.id;
        
          let $clone = d.importNode($template, true);
          $fragment.appendChild($clone);
        });

        $table.querySelector("tbody").appendChild($fragment);


    }catch(err){
        let message = err.status || "ocurrio un error";
        $table.insertAdjacentHTML("afterend", `<br><p><b>Error${err.status}:${message}</p></b><br>`);
    }
}

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async e => {
    if(e.target === $form){
        e.preventDefault();

        if(!e.target.id.value){
            //Create - POST
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type":"application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        name: e.target.name.value,
                        description: e.target.description.value
                    })
                },
                res = await fetch("http://localhost:33495/api/cities/1/pointsofinterest", options),
                json = await res.json();

                if(!res.ok)
                throw {
                    status: res.status,statusText: res.statusText
                };

                location.reload();

            } catch (err) {
                let message = err.status || "ocurrio un error";
        $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status} : ${message}</p></b>`);
            }
        } else {
            //Update - PUT
            try{
            let options = {
                method: "PUT",
                headers: {
                    "Content-type":"application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    name: e.target.name.value,
                    description: e.target.description.value
                })
            },
            res = await fetch(`http://localhost:33495/api/cities/1/pointsofinterest/${e.target.id.value}`, options),
            json = await res.json();

            if(!res.ok)
            throw {
                status: res.status,statusText: res.statusText
            };

            location.reload();

        } catch (err) {
            let message = err.status || "ocurrio un error";
    $form.insertAdjacentHTML("afterend", `<p><b>Error ${err.status} : ${message}</p></b>`);
        }
    }
    }
});

d.addEventListener("click", async e => {
    if(e.target.matches(".edit")){
        $title.textContent = "Editar Point Of Interest";
        $form.name.value = e.target.dataset.name;
        $form.description.value = e.target.dataset.description;
        $form.id.value = e.target.dataset.id;
    }

    if(e.target.matches(".delete")){
        let isDelete = confirm(`¿Estás seguro de eliminar el id ${e.target.dataset.id}?`)

        if (isDelete) {
            try{
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type":"application/json; charset=utf-8"
                    }
                },
                res = await fetch(`http://localhost:33495/api/cities/1/pointsofinterest/${e.target.dataset.id}`, options),
                json = await res.json();
    
                if(!res.ok)
                throw {
                    status: res.status,statusText: res.statusText
                };
    
                location.reload();
    
            } catch (err) {
                let message = err.status || "ocurrio un error";
        alert(`Error ${err.status}:${message}`);
            }
        }

    }

});

var app = new Vue({
    el: '#app',
    data: {
        point: true,
        edit: {
            isEdit: true,
            boton: true
        },

    }
})

Vue.component('button-color' , {
    data: function(){
        return{
            color: 'btn btn-primary'
        }
    },
    template: '<button v-on:click="color: color">Tocame para cambiar</button>',
})
new Vue({el : '#components-color'})