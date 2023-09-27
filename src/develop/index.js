import { H, CDN, __attr, attr, __html, html, showLoader, hideLoader, spaceID, initHeader, initBreadcrumbs, parseApiError, getCookie, onClick, simulateClick, onKeyUp, getSiteId, link, toast, onChange } from '@kenzap/k-cloud';
import { getPageNumber, getPagination, formatStatus, priceFormat, formatTime, formatTimeDetailed, getParam, initFooter, getSiteAPI } from "../_/_helpers.js"
import { layoutsDevelopContent } from "../_/_cnt_layouts_list.js"
import { EditLayout } from "../_/_mod_layout_edit.js"

/**
 * Main product listing page of the dashboard.
 * Loads HTMLContent from _cnt_product_list.js file.
 * Renders product list in a dynamic table.
 * 
 * @version 1.0
 */
class Develop {

    // construct class
    constructor(){
        
        this.state = {
            firstLoad: true,
            settings: {},
            limit: 10, // number of records to load per table
        };

        // do API query
        fetch('https://api-v1.kenzap.cloud/', {
            method: 'post',
            headers: H(),
            body: JSON.stringify({
                query: {
                    user: {
                        type:       'authenticate',
                        fields:     ['avatar'],
                        token:      getCookie('kenzap_token')
                    },
                    locale: {
                        type:       'locale',
                        source:      ['extension'],
                        key:         'ecommerce',
                    }
                }
            })
        })
        .then(response => response.json())
        .then(response => {

            // hide UI loader
            hideLoader();

            if(response.success){

                // init header
                initHeader(response);

                // get core html content 
                this.html();  

                // get pages data
                this.getData();
            }
        });
    }

    /**
     * Get data from the cloud and authenticate the user.
     * Load translation strings.
     * Get any additional data by extending the query object.
     * 
     * @version 1.0
     * @link https://developer.kenzap.cloud/
     */
    getData = () => {

        // show loader during first load
        if (this.state.firstLoad) showLoader();

        // search content
        let s = document.querySelector('.search-cont input') ? document.querySelector('.search-cont input').value : '';

        fetch(getSiteAPI() + 'v1/?' + new URLSearchParams({
            cmd:        'get_develop_lists',
            token:      getCookie('kenzap_token'),
            limit:      this.state.limit,
            offset:     s.length > 0 ? 0 : getPageNumber() * this.state.limit - this.state.limit,    // automatically calculate the offset of table pagination
            search:     s
        }))
        .then(response => response.json())
        .then(response => {

            console.log(response);

            response.locale = [];

            if(response.success){

                // render table
                this.render(response);

                // bind content listeners
                this.initListeners();
            
                // init pagination
                this.initPagination(response);

                // initiate footer
                initFooter(this);

                // hide loader
                hideLoader();

                // first load
                this.state.firstLoad = false;

            }else{

                parseApiError(response);
            }

        });
    }

    authUser = (response) => {

        if(response.user){
            
            if(response.user.success == true){

                
            }
        }
    }

    html = () => {
  
        if(!this.state.firstLoad) return;

        // get core html content 
        document.querySelector('#contents').innerHTML = layoutsDevelopContent();
    }

    render = (response) => {

        if(this.state.firstLoad){

            // initiate breadcrumbs
            initBreadcrumbs(
                [
                    { link: link('https://dashboard.kenzap.cloud'), text: __html('Home') },
                    { link: link('/sites/'), text: __html('Sites') },
                    { text: __html('Developer') }
                ]
            );

            // init table header
            document.querySelector(".table thead").innerHTML = `
                <tr>
                    <th class="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#212529" class="bi justify-content-end bi-search mb-1" viewBox="0 0 16 16" >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                        </svg>
                    </th>
                    <th>
                        <div class="search-cont input-group input-group-sm mb-0 justify-content-start">     
                            <input type="text" placeholder="${ __html('Search') }" class="form-control border-top-0 border-start-0 border-end-0 rounded-0" aria-label="${ __html('Search products') }" aria-describedby="inputGroup-sizing-sm" style="max-width: 200px;">
                        </div>
                        <span>${ __html("Layout") }</span>
                    </th>
                    <th>${ __html("Status") }</th>
                    <th>${ __html("Class") }</th>
                    <th>${ __html("Updated") }</th>
                    <th></th>
                </tr>`;
        }

        let sid = getSiteId();
        this.state.settings = response.settings;
        this.state.layouts = response.layouts;

        // console.log(this.state.sites);

        // no products in the list
        if(!response.layouts) response.layouts = [];

        if(response.layouts.length == 0){

            document.querySelector(".table tbody").innerHTML = `<tr><td colspan="6" class="text-center form-text fs-6 p-3">${ __html("no layouts to display") }</td></tr>`;
            return;
        }

        // generate table
        document.querySelector(".table tbody").innerHTML = response.layouts.map((layout, x) => {

            layout.img = 'https://cdn.kenzap.com/loading.png';
            if(!layout.meta.preview) layout.meta.preview = "false";
            if(layout.meta.preview == "true") layout.img = `https://static.kenzap.com/preview/${ attr(layout.template + '-' + layout.meta.slug) }-600.jpeg?` + __attr(layout.meta.updated);

            return `
            <tr>
                <td>
                    <div class="timgc">
                        <a href="${ link('/develop-edit/?id=' + attr(layout.id)) }" class="edit-layout" data-id="${ attr(layout.id) }"><img src="${ layout.img }" data-srcset="${ layout.img }" class="img-fluid rounded" alt="${ __attr("Layout placeholder") }" srcset="${ layout.img }" ></a>
                    </div>
                </td>
                <td class="destt" style="max-width:250px;">
                    <div>
                        <a style="font-size:15px;color:#000E35;" class="edit-layout" href="${ link('/develop-edit/?id=' + attr(layout.id)) }" data-id="${ attr(layout.id) }"><b>${ html(layout.meta.title) }</b><i style="color:#9b9b9b;font-size:16px;margin-left:8px;display:none" title="Edit" class="mdi mdi-pencil menu-icon edit-cat"></i></a>
                        <div style="font-size:12px;">${ html(layout.template) } template</div>
                    </div>
                </td>
                <td class="">
                    ${ formatStatus(__html, layout.meta.status ? layout.meta.status : 1) }
                </td>
                <td class="form-text text-danger">
                    .${ __html(layout.meta.class) }
                </td>
                <td class="form-text">
                    ${ formatTimeDetailed(__html, layout.meta.updated) }
                </td>
                <td class="text-end">
                    <div class="dropdown layoutActionsCont">
                        <svg id="layoutActions${ attr(x) }" data-bs-toggle="dropdown" data-boundary="viewport" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots-vertical dropdown-toggle po" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                        <ul class="dropdown-menu" aria-labelledby="layoutActions${ attr(x) }">
                            <li><a class="dropdown-item po edit-layout" href="#" data-id="${ attr(layout.id) }" data-index="${ attr(x) }">${ __html('Edit') }</a></li>
                            <li><a class="dropdown-item po download-template" href="#" data-title="${ html(layout.meta.title) }" data-template="${ attr(layout.template) }" data-slug="${ attr(layout.meta.slug) }" data-class="${ attr(layout.meta.class) }" data-id="${ attr(layout.id) }" data-index="${ attr(x) }">${ __html('Download') }</a></li>
                            <li><a class="dropdown-item po d-none" href="#" data-id="${ attr(layout.id) }" data-index="${ attr(x) }">${ __html('Duplicate') }</a></li>
                            <li><a class="dropdown-item po d-none" href="#" data-type="query" data-id="${ attr(layout.id) }" data-_id="${ attr(layout.id) }" data-index="${ attr(x) }">${ __html('Query') }</a></li>
                            <li><hr class="dropdown-divider d-none-"></li>
                            <li><a class="dropdown-item po remove-layout" href="#" data-type="cancel" data-id="${ attr(layout.id) }" data-index="${ attr(x) }">${ __html('Remove') }</a></li>
                        </ul>
                    </div>
                </td>
            </tr>`;

        }).join('');
    }

    initListeners = () => {

        // remove website
        onClick('.remove-layout', this.listeners.removeLayout);

        // edit pages
        onClick('.view-pages', this.listeners.viewPages);

        // download template
        onClick('.download-template', this.listeners.downloadTemplate)

        // change domain
        onClick('.edit-layout', this.listeners.editLayout);

        // search products activation
        onClick('.table-p-list .bi-search', this.listeners.searchProductsActivate);

        // break here if initListeners is called more than once
        if(!this.state.firstLoad) return;

        // add product modal
        onClick('.btn-add', this.addLayout);

        // add product confirm
        onClick('.btn-modal', this.listeners.modalSuccessBtn);
    }

    listeners = {

        downloadTemplate: (e) => {
        
            e.preventDefault();

            toast( __html("Downloading") );

            showLoader();

            let saveBlob = (blob, fileName) => {
                
                var a = document.createElement('a');
                a.href = window.URL.createObjectURL(blob);
                a.download = fileName;
                a.dispatchEvent(new MouseEvent('click'));
            }

            let cl = e.currentTarget.dataset.class;
            let slug = e.currentTarget.dataset.slug;
            let title = e.currentTarget.dataset.title;
            let template = e.currentTarget.dataset.template;

            // send data
            fetch('https://api.pages.app.kenzap.cloud/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    'Kenzap-Locale': getCookie('locale') ? getCookie('locale') : "en",
                    'Kenzap-Token': getCookie('kenzap_token'),
                },
                body: JSON.stringify({
                    query: {
                        download: {
                            type:      'download-template',
                            class:     cl,   
                            title:     title,   
                            slug:      slug,   
                            template:  template,   
                            data:      []
                        }
                    }
                })
            })
            .then(response => response.blob())
            .then(data => {
                
                hideLoader();

                // probably not a file, check for errors
                if(data.size < 100){

                    data.text().then(function(result){
                        
                        let js = JSON.parse(result);
                        if(!js.success){

                            toast( __html("Can not download template") );
                        }
                    });

                // parse output
                }else{

                    saveBlob(data, template + '.zip');
                }
            })
            .catch(error => { 

                parseApiError(error); 
            });
        },

        removeLayout: (e) => {

            e.preventDefault();

            let c = confirm( __html('Completely remove this layout?') );

            if(!c) return;
  
            // let site = this.state.sites.filter((o) => o._id == e.currentTarget.dataset.id)[0];

            showLoader();

            // remove
            fetch(getSiteAPI() + 'v1/?' + new URLSearchParams({
                cmd:        'remove_layout',
                token:      getCookie('kenzap_token'),
                id:         e.currentTarget.dataset.id 
            }))
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    toast(__html('Layout removed'));

                    this.getData();

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });
        },

        viewPages: (e) => {

            e.preventDefault();

            // console.log(e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.destt a'))
            // simulateClick(e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.destt a'));
        },

        editLayout: (e) => {

            e.preventDefault();

            this.state.layoutEditId = e.currentTarget.dataset.id;

            this.state.refresh = () => {
             
                this.getData();
            }

            this.state.editLayout = new EditLayout(this.state);
        },
 
        searchProductsActivate: (e) => {

            e.preventDefault();

            document.querySelector('.table-p-list thead tr th:nth-child(2) span').style.display = 'none';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont').style.display = 'flex';
            document.querySelector('.table-p-list thead tr th:nth-child(2) .search-cont input').focus();

            // search products
            onKeyUp('.table-p-list thead tr th:nth-child(2) .search-cont input', this.listeners.searchProducts);
        },
 
        searchProducts: (e) => {

            e.preventDefault();

            this.getData();
        },

        modalSuccessBtn: (e) => {
            
            this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    }

    addLayout = (e) => {

        let modal = document.querySelector(".modal");
        let modalCont = new bootstrap.Modal(modal);
        
        // let options = '<option value="universal">Universal</option>';
        // options += '<option value="myticket">MyTicket</option>';
        // for(let t in templates){
        //   options += '<option value="'+templates[t].slug+'">'+templates[t].extra.title+'</option>';
        // }

        modal.querySelector(".modal-title").innerHTML = __html('Add Layout');
        modal.querySelector(".modal-footer").innerHTML = `
            <button type="button" class="btn btn-primary btn-add-layout">${ __html('Add') }</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${ __html('Cancel') }</button>
        `;
        
        modal.querySelector(".modal-body").innerHTML = `
        <div class="form-cont">
            <img style="width:100%;max-height:200px;" class="mb-3" src="/assets/img/new-entry.svg">
            <div class="form-group mb-3">
                <div class="form-group">
                    <label for="tname">${ __html('Layout name') }</label>
                    <input id="tname" class="form-control tname" type="text" placeholder="Interactive Slider" />
                    <p class="form-text" >${ __html('Make it short. Once layout name is assigned it can not be changed.') }</p>
                </div>
                <div class="form-group">
                    <label for="ttemp">${ __html('Template (optional)') }</label>
                    <input id="ttemp" class="form-control ttemp" type="text" placeholder="universal" value="Universal" />
                    <p class="form-text" >${ __html('Specify this option if layout relies on Cloud Applicaton API.') }</p>
                </div>
                <p class="form-text" >Need more help? <a target="_blank" href="https://kenzap.com/help-center/">Contact us here</a>.</p>\
            </div>
        </div>`;

        // onChange('[name="domain_type"]', e => {

        //     if(modal.querySelector('[name="domain_type"]:checked').value == 'custom'){

        //         modal.querySelector(".c-domain").classList.remove('d-none');
        //     }else{
        //         modal.querySelector(".c-domain").classList.add('d-none');
        //     }
        // });
        onClick('.btn-add-layout', (e) => {

            e.preventDefault();

            let tname = modal.querySelector(".tname").value;
            if(tname.length<4){ alert("Please enter longer name"); return false; }
            // if(ttemp.length<4){ alert("Please enter longer name"); return false; }
            let tnameF = tname.replace(/[^\w\s]/gi, '');

            showLoader();

            // create
            fetch(getSiteAPI() + 'v1/?' + new URLSearchParams({
                cmd:        'create_layout',
                token:      getCookie('kenzap_token'),
                tname:      tnameF,
                ttemp:      modal.querySelector(".ttemp").value 
            }))
            .then(response => response.json())
            .then(response => {

                if (response.success){
                  
                    modalCont.hide();

                    toast(__html('Layout created'));

                    this.getData();

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });
        });

        modalCont.show();

        setTimeout(() => modal.querySelector("#tname").focus(),100);
    }

    initPagination = (response) => {

        getPagination(__, response.meta_layouts, this.getData);
    }
}

new Develop();