import { H, __html, __attr, attr, html, parseApiError, getCookie, toast, hideLoader, simulateClick, onClick, showLoader } from '@kenzap/k-cloud';
import { simpleTags, onlyNumbers, getSiteAPI } from "../_/_helpers.js"

/**
 * Layout edit class. Initiates layout editing modal and listerners
 * 
 * @version 1.0
 */
export class EditLayout {

    // construct class
    constructor(state){

        this.state = state;
        this.state.editor = [];

        this.init();
    }

    init = () => {

        fetch(getSiteAPI() + 'v1/?' + new URLSearchParams({
            cmd:        'get_develop_layout',
            source:     'layout',
            token:      getCookie('kenzap_token'),
            id:         this.state.layoutEditId
        }))
        .then(response => response.json())
        .then(response => {

            if(response.success){

                this.state.layoutResponse = response;

                this.render();
            }else{

                parseApiError(response);
            }

            hideLoader();
        })
        .catch(error => { parseApiError(error); });
    }

    render = () => {

        let layout = this.state.layoutResponse.layout;
        this.state.modal = document.querySelector(".modal");
        this.state.modalCont = new bootstrap.Modal(this.state.modal);

        this.state.modal.querySelector(".modal-dialog").classList.add('modal-fullscreen');
        this.state.modal.querySelector(".modal-title").innerHTML = html(layout.meta.title);// __html('Edit Layout');
        this.state.modal.querySelector(".modal-footer").innerHTML = `
            <button type="button" class="btn btn-primary btn-update-layout">${ __html('Update') }</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${ __html('Cancel') }</button>
        `;

        this.state.modal.querySelector(".modal-body").innerHTML = `
        <div class="form-cont">
            <div class="form-group mb-3">
                <div class="row">
                    <div class="col-md-6 grid-margin- stretch-card-">
                        <div class="card-">
                            <div class="card-body-">
                                <h6 class="card-title">${ __html('HTML code') }</h4>
                                <textarea id="ace_html" class="ace-editor w-400" style="width:200px;height:200px;"> </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 grid-margin- stretch-card-">
                        <div class="card-">
                            <div class="card-body-">
                                <h6 class="card-title">${ __html('JSON data') }</h4>
                                <textarea id="ace_json" class="ace-editor w-400"> </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6 grid-margin- stretch-card-">
                        <div class="card-">
                            <div class="card-body-">
                                <h6 class="card-title">${ __html('JS code') }</h4>
                                <textarea id="ace_js" class="ace-editor w-400"> </textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 grid-margin- stretch-card-">
                        <div class="card-">
                            <div class="card-body-">
                                <h6 class="card-title">${ __html('CSS code') } <span class="cssclass"></span></h4>
                                <textarea id="ace_css" class="ace-editor w-400"> </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <br>
                <div class="row">
                    <div class="col-md-12 grid-margin stretch-card- settings">
                        <div class="card-">
                            <div class="card-body-">
                                <h6 class="card-title mb-3">${ __html('Layout settings') }</h4>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="title" class="col-sm-3 col-form-label">${ __html('Title') }</label>
                                            <div class="col-sm-9">
                                                <input id="title" type="text" class="text-input form-control  inps" value="" name="title">
                                                <p class="card-description mt-2 form-text">${ __html('Layout title used in search and for section preview') }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="slug" class="col-sm-3 col-form-label">${ __html('Slug') }</label>
                                            <div class="col-sm-9">
                                                <input id="slug" type="text" class="text-input form-control  inps" value="" name="slug" disabled>
                                                <p class="card-description mt-2 form-text">${ __html('Used for template navigation') }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="class" class="col-sm-3 col-form-label">${ __html('CSS Class') }</label>
                                            <div class="col-sm-9">
                                                <input id="class" type="text" class="text-input form-control  inps" value="${ attr(layout.meta.class) }" name="class" disabled>
                                                <p class="card-description mt-2 form-text">${ __html('Unique class to be prefixed for each CSS rule') }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="template" class="col-sm-3 col-form-label">${ __html('Template') }</label>
                                            <div class="col-sm-9">
                                                <input id="template" type="text" class="text-input form-control  inps" value="" name="template" >
                                                <p class="card-description mt-2 form-text">${ __html('Parent template required to render this layout') }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="version" class="col-sm-3 col-form-label">${ __html('Version') }</label>
                                            <div class="col-sm-9">
                                                <input id="version" type="text" class="text-input form-control  inps" value="" name="title">
                                                <p class="card-description mt-2 form-text">${ __html('Layout version control') }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="description" class="col-sm-3 col-form-label">${ __html('Description') }</label>
                                            <div class="col-sm-9">
                                                <textarea id="description" type="text" class="text-input form-control  inps" value="" rows="2" name="description"></textarea>
                                                <p class="card-description mt-2 form-text">${ __html('Short layout description') }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="keywords" class="col-sm-3 col-form-label">${ __html('Keywords') }</label>
                                            <div class="col-sm-9">
                                                <textarea id="keywords" type="text" class="text-input form-control  inps" value="" rows="3" name="keywords"></textarea>
                                                <p class="card-description mt-2 form-text">${ __html('Separate keywords by ",". Ex.: slider, banner, image') }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="title" class="col-sm-3 col-form-label">${ __html('Repository') }</label>
                                            <div class="col-sm-9">
                                                <input id="repository" type="text" class="text-input form-control  inps" value="" name="title">
                                                <p class="card-repository mt-2 form-text">${ __html('Link to Github repository where your layout is stored') }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" >
                                    <div class="col-md-6">
                                        <div class="form-group row">
                                            <label for="preview" class="col-sm-3 col-form-label">${ __html('Preview') }</label>
                                            <div class="col-sm-9">

                                                <div class="file-search-img image-cont image-preview" data-id="preview_1" >
                                                    <img id="i_preview_1" class="image" src="https://static.kenzap.com/layouts/image.jpg"/>
                                                    <div id="p_preview_1" class="progress">
                                                    <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                                <input id="u_preview_1" type="file" name="img[]" class="image-upload" data-iid="" data-id="preview_1"></input>
                                                <input id="preview_1" data-val="false" type="hidden" class="image-input image-val inps" value=""></input>
                                                
                                                <!-- <input id="preview" type="text" class="text-input form-control  inps" value="" name="preview"> -->
                                                <p class="card-description mt-2 form-text">Layout preview image 1200x742px</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p class="form-text" >Need more help? <a target="_blank" href="https://kenzap.com/help-center/">Contact us here</a>.</p>\
            </div>
        </div>`;

        onClick('.btn-update-layout', (e) => {

            this.update();
        });

        this.state.modalCont.show();

        this.listeners();

        this.preview();
    }

    listeners = () => {

        let layout = this.state.layoutResponse.layout;

        // init editor
        if(document.querySelector('#ace_html')){

            this.state.editor['html'] = ace.edit("ace_html");
            ace.config.set('basePath', 'https://account.kenzap.com/js/ace/');
            this.state.editor['html'].setTheme("ace/theme/monokai");
            this.state.editor['html'].getSession().setMode("ace/mode/html");
            this.state.editor['html'].setValue(layout['html']);

            document.getElementById('ace_html');
        }

        if(document.querySelector('#ace_js')){

            this.state.editor['js'] = ace.edit("ace_js");
            this.state.editor['js'].setTheme("ace/theme/monokai");
            this.state.editor['js'].getSession().setMode("ace/mode/javascript");
            this.state.editor['js'].setValue(layout['js']);

            document.getElementById('ace_js');
        }

        if(document.querySelector('#ace_json')){

            // set defaults if not yet
            try{

                document.querySelector('#title').value = html(layout['meta']['title']);
                document.querySelector('#version').value = html(layout['meta']['version']);
                document.querySelector('#description').value = html(layout['meta']['description'] ? layout['meta']['description'] : '');
                document.querySelector('#template').value = html(layout['meta']['template']);
                document.querySelector('#repository').value = html(layout['meta']['repository'] ? layout['meta']['repository'] : '');
                document.querySelector('#keywords').value = html(layout['meta']['keywords'] ? layout['meta']['keywords'] : '');
                document.querySelector('#slug').value = html(layout['meta']['slug']);
                document.querySelector('#class').value = html(layout['meta']['class']);

            }catch(e){

                alert(e);

            }

            this.state.editor['json'] = ace.edit("ace_json");
            this.state.editor['json'].setTheme("ace/theme/monokai");
            this.state.editor['json'].getSession().setMode("ace/mode/json");
            this.state.editor['json'].setValue(JSON.stringify(layout['extra'], null, 2));

            document.getElementById('ace_json');
        }

        if(document.querySelector('#ace_css')){

            this.state.editor['css'] = ace.edit("ace_css");
            this.state.editor['css'].setTheme("ace/theme/monokai");
            this.state.editor['css'].getSession().setMode("ace/mode/css");
      
            document.querySelector('.cssclass').innerHTML = layout['meta']['class'];

            this.state.editor['css'].setValue(layout['css']);
        }
    }

    preview = () => {

        let layout = this.state.layoutResponse.layout;
        let d = new Date();
        let src = 'https://static.kenzap.com/preview/' + layout['meta']['template'] + '-'+layout['meta']['slug'] + '-600.jpeg?' + d.getTime();

        // check if image present on CDN
        var image = new Image();
        image.src = src;
        image.onload = () => {
      
            if(image.width>400){
                
                layout['meta']['preview'] = true;
                document.querySelector("#i_preview_1").setAttribute("src", src);
                document.querySelector("#preview_1").setAttribute("data-val", true);
            }
        };
      
        document.querySelector("#u_preview_1").setAttribute("data-iid", layout['meta']['template'] + '-' + layout['meta']['slug']);

        let imgList = false;

        // image click listener
        if(imgList) return; imgList = true;
        let ip = document.querySelectorAll(".image-preview");
        for (const a of ip) {
            a.addEventListener('click', function(e) {

                // console.log(this.dataset.id);

                let inp = document.querySelector("#u_"+this.dataset.id); //.closest('.controls')
                simulateClick(inp);

                return false;
            });
        }

        // image upload callback
        let iu = function(id, iid, file){
        
            let fd = new FormData();
            fd.append('file',file);
            fd.append('id', iid);
            fd.append('cmd','store_image');
            // fd.append('sizes',sizes);
            fd.append('type','cloud_preview');
            fd.append('lang', 'en');
            fd.append('token',getCookie('kenzap_token'));

            // init progress bar 
            document.querySelector("#p_"+id).style.display = "block";
            document.querySelector("#p_"+id+" > div").style.width = "0%";

            // upload to backend
            $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                            
                            document.querySelector("#p_"+id+" > div").style.width = parseInt(percentComplete * 100)+'%';
                            if(percentComplete == 1) setTimeout(function(){ document.querySelector("#p_"+id).style.display = "none"; },500);
                        }
                    }, false);
                    xhr.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;

                            document.querySelector("#p_"+id+" > div").style.width = parseInt(percentComplete * 100)+'%';
                            if(percentComplete == 1) setTimeout(function(){ document.querySelector("#p_"+id).style.display = "none"; },500);
                        }
                    }, false);
                    return xhr;
                },
                url: 'https://fileapi.kenzap.com/v1/',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response){

                    var js = JSON.parse(response);
                    if(js.success){

                        document.querySelector("#preview_1").setAttribute("data-val", true);
                    }
                },
            });
        }

        // image preview listener
        let iup = document.querySelectorAll(".image-upload");
        for (const a of iup) {
            a.addEventListener('change', function(e) {

                // console.log("image-upload preview");
                if (this.files && this.files[0]) {
            
                    let fl = this;
                    let reader = new FileReader();
                    reader.onload = function(e) {
                    
                        let im = document.querySelector("#i_"+fl.dataset.id);
                        if(im) im.setAttribute("src", e.target.result);

                        // upload image
                        iu(fl.dataset.id, fl.dataset.iid, fl.files[0]);
                    }
                    reader.readAsDataURL(fl.files[0]);
                }
            });
        }
    }

    update = () => {

        // btn loading
        if(this.state.modal.querySelector('.btn-update-layout').dataset.loading) return;

        this.state.modal.querySelector('.btn-update-layout').dataset.loading = true;
        this.state.modal.querySelector('.btn-update-layout').innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' + __html('Loading..');
     
        try{
            let id = this.state.layoutEditId;
            let jsonv = JSON.parse(this.state.editor['json'].getValue());
            if(jsonv.data == undefined) jsonv.data = {}

            jsonv.data.version = document.querySelector("#version").value;
            jsonv.data.title = document.querySelector("#title").value;
            jsonv.data.slug = document.querySelector("#slug").value;
            jsonv.data.description = document.querySelector("#description").value;
            jsonv.data.preview = document.querySelector("#preview_1").dataset.val;
            jsonv.data.template = document.querySelector("#template").value;
            jsonv.data.keywords = document.querySelector("#keywords").value;
            
            let meta = {};
            meta['version'] = document.querySelector("#version").value;
            meta['title'] = document.querySelector("#title").value;
            meta['description'] = document.querySelector("#description").value;
            meta['preview'] = document.querySelector("#preview_1").dataset.val;
            meta['keywords'] = document.querySelector("#keywords").value;
            // meta['csslibs'] = document.querySelector("#css_dependencies").value;
            // meta['jslibs'] = document.querySelector("#js_dependencies").value;
      
            let html = JSON.stringify(this.state.editor['html'].getValue());
            let css = JSON.stringify(this.state.editor['css'].getValue());
            let json = JSON.stringify(jsonv);
            let js = JSON.stringify(this.state.editor['js'].getValue());

            showLoader();

            // Build formData object.
            let fd = new FormData();
            fd.append('cmd', 'save_develop_layout');
            fd.append('version', document.querySelector("#version").value.trim());
            fd.append('title', document.querySelector("#title").value.trim());
            fd.append('description', document.querySelector("#description").value.trim());
            fd.append('preview', document.querySelector("#preview_1").dataset.val.trim());
            fd.append('keywords', document.querySelector("#keywords").value.trim());
            fd.append('repository', document.querySelector("#repository").value.trim());
            fd.append('html', html);
            fd.append('css', css);
            fd.append('json', json);
            fd.append('js', js);
            fd.append('id', this.state.layoutEditId);
            fd.append('token', getCookie('kenzap_token'));

            fetch(getSiteAPI() + 'v1/', {
                method: 'POST',
                body: fd
            })
            .then(response => response.json())
            .then(response => {

                hideLoader();
                
                this.state.modal.querySelector('.btn-update-layout').dataset.loading = "";
                this.state.modal.querySelector('.btn-update-layout').innerHTML = __html('Update');

                if(response.success){
          
                    this.state.refresh.call();

                    this.state.modalCont.hide();

                    toast(__html('Layout updated'));
                    
                }else{
            
                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });
      
        }catch(e){
      
            console.log(e);
        }
    }
}
