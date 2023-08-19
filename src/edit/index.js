import { H, __html, __attr, showLoader, hideLoader, initHeader, initBreadcrumbs, parseApiError, getCookie, onClick, onChange, onKeyUp, simulateClick, spaceID, toast, link, slugify } from '@kenzap/k-cloud';
import { getParam, makeNumber, priceFormat, onlyNumbers, loadAddon, initFooter, makeid } from "../_/_helpers.js"
import { Controls } from "../_/_controls-v3.js"
import { simpleTags } from "../_/_ui.js"
import { HTMLContent } from "../_/_cnt_page_edit.js"

/**
 * Main product listing page of the dashboard.
 * Loads HTMLContent from _cnt_product_list.js file.
 * Renders product list in a dynamic table.
 * 
 * @version 1.0
 */
class Edit {

    // construct class
    constructor(){
        
        this.state = {
            ajaxQueue: 0,
            settings: {}, // where all requested settings are cached
        };
    
        // connect to backend
        this.getData();
    }

    /**
     * Get data from the cloud and authenticate the user.
     * Load translation strings, product data, settings and basic user info.
     * Get any additional data by extending the query object.
     * 
     * @version 1.0
     * @link https://developer.kenzap.cloud/
     */
    getData = () => {

        // block ui during load
        showLoader();

        let id = getParam('id');

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
                    site: {
                        type:       'find',
                        key:        'pages-site',
                        fields:     ['_id', 'id', 'status', 'domain', 'title', 'updated'],
                        id:         getParam('site'),
                    },
                    page: {
                        type:       'find',
                        key:        'pages-page',
                        id:         id,   
                        fields:     ['_id', 'id', 'img', 'status', 'price', 'discounts', 'page', 'title', 'sdesc', 'cats', 'updated']
                    },
                    settings: {
                        type:       'get',
                        key:        'pages-settings',
                        fields:     ['currency', 'currency_symb', 'currency_symb_loc', 'tax_calc', 'tax_auto_rate', 'tax_rate', 'tax_display', 'scripts_product_edit', 'addons'],
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

            if (!response.success){ parseApiError(response); return; }

            if (response.success){

                this.state.response = response;
                this.state.settings = response.settings;

                // if(this.state.response)
                // console.log(response.page.title);

                // init header
                initHeader(response);
  
                // html content 
                document.querySelector('#contents').innerHTML = HTMLContent();

                // bind frontend data
                this.render(response.page);

                // init page listeners
                this.initListeners('all');

                // footer note
                initFooter(this);

                // load addons
                if(response.settings.addons) if(response.settings.addons.product_edit) response.settings.addons.product_edit.forEach(obj => { loadAddon(obj.src, obj.version); })

            }
        })
        .catch(error => { parseApiError(error); });
    }

    render = (page) => {

        let d = document, self = this;

        // initiate breadcrumbs
        initBreadcrumbs(
            [
                { link: link('https://dashboard.kenzap.cloud'), text: __html('Home') },
                { link: link('/sites/'), text: __html('Sites') },
                { link: link('/pages/?id='+getParam('site')), text: __html('Pages') },
                { text: this.state.response.page.page.title ? this.state.response.page.page.title : __html('Edit') },
            ]
        );

        // set defaults
        Controls.page = page.page == "" ? {
            title: this.state.response.page.title,
            sections: [], 
            typography: {
                "body": {
                    "font": {
                        "hint": "",
                        "input": "font",
                        "title": "Font",
                        "value": "Red Hat Mono",
                        "default": ""
                    },
                    "type": {
                        "hint": "",
                        "input": "text",
                        "title": "Type",
                        "value": "sans-serif",
                        "default": ""
                    },
                    "weight": {
                        "hint": "",
                        "input": "text",
                        "title": "Weight",
                        "value": "400",
                        "default": ""
                    }
                },
                "hint": "Font pairs, typography settings.",
                "title": "Fonts",
                "heading": {
                    "font": {
                        "hint": "",
                        "input": "font",
                        "title": "Font",
                        "value": "Red Hat Mono",
                        "default": ""
                    },
                    "type": {
                        "hint": "",
                        "input": "text",
                        "title": "Type",
                        "value": "monospace",
                        "default": ""
                    },
                    "weight": {
                        "hint": "",
                        "input": "text",
                        "title": "Weight",
                        "value": "600",
                        "default": ""
                    }
                }
            }
        } : page.page;

        // palette defaults
        if(!Controls.page.palette) Controls.page.palette = [
            { color: '#111111', name: 'txtColorA', title: __html("Primary text color") },
            { color: '#818181', name: 'txtColorB', title: __html("Secondary text color") },
            { color: '#ffffff', name: 'txtColorC', title: __html("Inverse text color") },
            { color: '#04106B', name: 'linkColorA', title: __html("Primary link color") },
            { color: '#071881', name: 'linkColorB', title: __html("Secondary link color") },
            { color: '#1941df', name: 'baseColorA', title: __html("Base color A") },
            { color: '#48AA27', name: 'baseColorB', title: __html("Base color B") },
            { color: '#FFBF00', name: 'accColorA', title: __html("Accent color A") },
            { color: '#FF4635', name: 'accColorB', title: __html("Accent color B") },
            { color: '#F7F7F7', name: 'grayColorA', title: __html("Gray color light") },
            { color: '#c0c0c0', name: 'grayColorB', title: __html("Gray color normal") },
            { color: '#818181', name: 'grayColorC', title: __html("Gray color dark") },
        ];

        // preview link
        if(!Controls.page.slug) Controls.page.slug = slugify(Controls.page.title);
        document.querySelector('.preview-link').setAttribute('href', 'https://'+this.state.response.site.domain+'/'+this.state.response.page.page.slug+'/');
        Controls.page.slug_old = Controls.page.slug;

        self.editor();

        // salightly delay preview update
        if(self.state.timeoutIframe1) clearTimeout(self.state.timeoutIframe1);
        self.state.timeoutIframe1 = setTimeout(e => self.preview(), 500);
    }

    editor = () => {
    
        // initialize sections and load layout editing controls
        Controls.init(".sections", Controls.page, this.controlsUpdates, 'sections');
    }

    initSections = () => {   
        
        // clear any previous sections
        // document.querySelector('.sections > .card.lay').remove();
        document.querySelectorAll('.sections > .card.lay').forEach(e => e.remove());

        // initialize sections and load layout editing controls
        Controls.init(".sections", Controls.page, this.controlsUpdates, 'sections');
    
        // activate sections drag and drop events
        // _this.initDragula();
    }

    controlsUpdates = () => {

        // console.log('controlsUpdates');
        // console.log(Controls.obj);

        if(Controls.obj){

          let action = Controls.obj.action;
          this.state.changes = true;

          console.log(action);
          switch(action){

            case 'section-moveup':  this.initSections(); break;
            case 'section-movedown': this.initSections(); break;
            case 'section-copy': this.initSections(); break;
            case 'section-remove': this.initSections(); break;
            case 'edit': break;
            case 'copy': break;
            case 'remove': break;
          }
        }

        this.preview();
    }

    initListeners = (type = 'partial') => {

        let self = this;

        // listeners that can be initiated only once
        // if(type == 'all'){

            // product save button
            onClick('.btn-publish', this.listeners.save);
            
            // modal success button
            onClick('.p-modal .btn-primary', this.listeners.modalSuccessBtn);
        // }

        // edit variation block
        // onClick('.edit-block', this.listeners.editBlock);

        // add layout
        onClick('.add-layout', this.listeners.addLayout);

        // remove variation block
        onClick('.remove-block', this.listeners.removeBlock);

        // page scroll listener
        // console.log('adding listeners');
        // document.querySelector('.preview').style.height = (document.querySelector('body').offsetHeight / 2) + 'px';
        // console.log((document.querySelector('body').offsetHeight / 2) + 'px');
        window.addEventListener('scroll', e => {

            if(e.currentTarget.scrollY > 70 && document.querySelector('body').offsetWidth > 991){

                document.querySelector('.preview').style.position = 'fixed';
                document.querySelector('.preview').style.top = '64px';
                document.querySelector('.preview').style.width = self.state.iframe_width+'px';
            }else{

                document.querySelector('.preview').style.position = 'relative';
                document.querySelector('.preview').style.top = '0';
                document.querySelector('.preview').style.width = '100%';
                self.state.iframe_width = document.querySelector('.preview').offsetWidth;
            }
            
            // self.state.iframeScrollY = e.currentTarget.scrollY;
            // console.log(document.querySelector('body').offsetHeight);
        });
    

        // position: fixed;
        // top: 64px;

        // iframe scrolll listener
        document.querySelector('.preview').addEventListener('load', e => {
            e.target.contentWindow.addEventListener('scroll', e => {

                self.state.iframeScrollY = e.currentTarget.scrollY;
                // console.log(e.currentTarget.scrollY);
            });
        });
    }

    listeners = {

        addLayout: (e) => {

            let modal = document.querySelector(".modal");
            let modalCont = new bootstrap.Modal(modal);
            modal.querySelector(".modal-dialog").style.maxWidth = '700px';
            modal.querySelector(".modal-dialog").style.minHeight = '500px';
            let CDN2 = 'https://static.kenzap.com';
            
            modal.querySelector(".modal-title").innerHTML = `<input type="text" class="text-input form-control search-layout" value="" placeholder="${ __html('search') }" >`; // </input>__html('Add layout');
            modal.querySelector(".btn-primary").style.display = 'none';
            modal.querySelector(".btn-secondary").innerHTML = __html('Cancel');

            showLoader();

            let getLayouts = (s) => {

                // do API query
                fetch('https://api.pages.app.kenzap.cloud/', {
                    method: 'post',
                    headers: H(),
                    body: JSON.stringify({
                        query: {
                            layouts: {
                                type:          'preview_sections',
                                template:      'page_template',
                                s:             s
                            }
                        }
                    }) 
                })
                .then(response => response.json())
                .then(response => {

                    if(response.success){

                        // console.log(response);

                        Controls.layouts = response.layouts;
                        let html = '';
                        html += '<div class="row">';
                        for (let key in response.layouts) {

                            html += `<div class="col-md-6" style="margin:16px 0;">
                                        <h4>
                                            ${ response.layouts[key]['meta']['title'] }
                                            <div class="br-wrapper br-theme-css-stars"><select id="profile-rating" name="rating" autocomplete="off" style="display: none;"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select><div class="br-widget"><a href="#" data-rating-value="1" data-rating-text="1" class="br-selected"></a><a href="#" data-rating-value="2" data-rating-text="2" class="br-selected"></a><a href="#" data-rating-value="3" data-rating-text="3" class="br-selected"></a><a href="#" data-rating-value="4" data-rating-text="4" class="br-selected"></a><a href="#" data-rating-value="5" data-rating-text="5" class="br-selected br-current"></a></div></div>
                                        </h4>
                                        <img alt="${ response.layouts[key]['meta']['title'] }" style="max-width:100%;" src="${ CDN2+'/preview/'+response.layouts[key]['template']+'-'+response.layouts[key]['meta']['slug']+'-600.jpeg?'+response.layouts[key]['meta']['updated'] }" />
                                        <a class="sclick csection" data-index="${ key }" >${ __html('Choose this section') }</a>
                                    </div>`;
                        }

                        if(!response.layouts.length) html += `<div class="form-text text-center" style="margin:120px 0;">${ __html('No layouts found') }</p>`;

                        html += '</div>';                        

                        modal.querySelector(".modal-body").innerHTML = html;

                        onClick('.sclick', this.listeners.sectionClick);

                        modalCont.show();
                    }else{

                        simulateClick( simulateClick(document.querySelector('.modal .btn-close')) );
                        toast(__html('No layouts found.'));
                        // parseApiError(response);
                    }

                    // hide UI loader
                    hideLoader();
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            }

            getLayouts('');

            let timeout = "";
            onKeyUp('.search-layout', e => {

                e.preventDefault();

                let s = e.currentTarget.value;

                if(timeout) clearTimeout(timeout);

                timeout = setTimeout((s)=>{

                    getLayouts(s);

                }, 500, s);
            });
        },

        sectionClick: (e) => {

            simulateClick(document.querySelector('.modal .btn-close'));

            // console.log(Controls.page);
   
            let layout = Controls.layouts[e.currentTarget.dataset.index]['extra'];
            console.log(layout);
            layout['js'] = Controls.layouts[e.currentTarget.dataset.index]['js'];
            layout['css'] = Controls.layouts[e.currentTarget.dataset.index]['css'];
            layout['meta'] = Controls.layouts[e.currentTarget.dataset.index]['meta'];
            layout['data']['id'] = makeid(6);
            
            if(Controls.page.sections == undefined) Controls.page.sections = [];
            // console.log(Controls.page);
            Controls.page.sections.push(layout);

            toast(__html('Layout added'));

            // refresh sections 
            this.initSections();

            // preview page
            this.preview();
        },

        editBlock: (e) => {

            e.preventDefault();

            let amb = document.querySelector('.add-mix-block');
            amb.dataset.action = 'edit';
            amb.dataset.index = e.currentTarget.dataset.index;
            setTimeout(() => simulateClick(amb), 10);
        },

        removeBlock: (e) => {

            e.preventDefault();

            let c = confirm(__html('Remove entire block?'));
            if(c){ 
                e.currentTarget.parentNode.parentNode.remove();
             }
        },

        save: (e) => {
            
            e.preventDefault();

            let data = {};

            data['site'] = getParam('site');
            data['page'] = Controls.page;

            if(!data.page.title) data.page.title = "Page " + Math.floor(Math.random() * 100);
            if(!data.page.slug) data.page.slug = slugify(data.page.title);
            data.page.sid = spaceID();

            let id = getParam('id');
            let site = getParam('site');

            // console.log(data);

            showLoader();

            // save data
            fetch('https://api-v1.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        page: {
                            type:       'update',
                            key:        'pages-page',
                            id:         id,         
                            sid:        spaceID(),
                            data:       data
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    // hideLoader();

                    this.getData();

                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); });

            // return;

            // publish page
            fetch('https://api.pages.app.kenzap.cloud/', {
                method: 'post',
                headers: H(),
                body: JSON.stringify({
                    query: {
                        page: {
                            type:       'publish',
                            html:       this.page,
                            home:       data.page.home_page,
                            folder:     data.page.slug,
                            folder_old: data.page.slug_old,
                            password:   { protect: data.page.password_protect, password: data.page.password, changes: data.page.password_changes ? true : false },
                            page_id:    id,         
                            site_id:    site,         
                            sid:        spaceID(),
                            // data:       data
                        }
                    }
                }) 
            })
            .then(response => response.json())
            .then(response => {

                if (response.success){

                    toast( __('Changes applied') );

                    // alert(document.querySelector('.p-edit .accordion').offsetHeight );
                    
                    // hideLoader();
                    // toast(__('changes applied'));
                    // upload desc images
                    // this.uploadImages();
                    
                }else{

                    parseApiError(response);
                }
            })
            .catch(error => { parseApiError(error); }); 
        },

        openImage: (e) => {

            e.preventDefault();
            simulateClick(document.querySelector(".aif-"+e.currentTarget.dataset.index));
        },

        previewImage: (e) => {

            e.preventDefault();

            let input = e.currentTarget;

            if (input.files && input.files[0]) {

                // check image type
                if(input.files[0].type != 'image/jpeg' && input.files[0].type != 'image/jpg' && input.files[0].type != 'image/png'){

                    toast( __html("Please provide image in JPEG format") );
                    return;
                }
          
                // check image size
                if(input.files[0].size > 5000000){

                    toast( __html("Please provide image less than 5 MB in size!") );
                    return;
                }

                let index = input.dataset.index;
                let reader = new FileReader();
                reader.onload = function(e) {
                  
                    document.querySelector('.images-'+index).setAttribute('src', e.currentTarget.result);
                }
                reader.readAsDataURL(input.files[0]);

                e.currentTarget.parentElement.querySelector('.remove').classList.remove("hd");
            }
        },

        removeImage: (e) => {

            let index = e.currentTarget.parentElement.dataset.index;
            document.querySelector('.aif-' + index).value = '';
            document.querySelector('.images-'+index).setAttribute('src', 'https://account.kenzap.com/images/placeholder.jpg');
            e.currentTarget.classList.add("hd");
        },

        modalSuccessBtn: (e) => {
            
            this.listeners.modalSuccessBtnFunc(e);
        },

        modalSuccessBtnFunc: null
    }

    preview = () => {

        // console.log("--------------");
        // console.log(Controls.page.sections);

        let self = this;

        if(!Controls.page.sections) return;

        document.querySelector('.preview').style.opacity = '0.01';

        // struct page preview HTML
        let js = "", js_cb = "", css = "";
        Controls.page.sections.forEach(section => {

            // console.log(section);
            if(!section.js) return;

            // console.log(section);
            js += section.js + ";";
            css += section.css + "\n";
            section.data.sid = spaceID();
            js_cb += `
            new ${ section.meta.class }( ${ JSON.stringify(section.data) });
            `
        });

        this.page = 
        `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>${ Controls.page.title ? Controls.page.title : "Kenzap Page" }</title> 
                    <meta name="Description" content="${ Controls.page.description ? Controls.page.description : "Kenzap Cloud Template" }" />
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <link href="https://fonts.googleapis.com/css?family=${ Controls.page.typography.heading.font.value }:200,400,600|${ Controls.page.typography.body.font.value }:200,400,600" rel="stylesheet">
                    <!-- Essential Layout styles Using major third by default https://type-scale.com -->
                    <style>
                    :root {
                        ${ Controls.page.palette.map((palette, i) => {

                            return `--${ palette.name }: ${ palette.color };\n`

                        }).join(``) }
                    }
                    html{font-size:16px; line-height: 1.75; -webkit-text-size-adjust: 100%; }
                    body{margin: 0; line-height: 1.75; font-weight: ; font-family: ${ Controls.page.typography.body.font.value }; color: var(--txtColorA); }
                    h1, h2, h3, h4, h5{font-weight: 200; line-height: 1.3; margin: 3rem 0 1.38rem; font-family: ${ Controls.page.typography.heading.font.value }}
                    h1{font-size: 3.052em;}
                    h2{font-size: 2.441em;}
                    h3{font-size: 1.953em;}
                    h4{font-size: 1.563em;}
                    h5{font-size: 1.25em;}
                    p{margin-bottom: 1rem;}
                    b,strong{font-weight: 600;}
                    small{font-size: 80%;}
                    
                    /* section spacings */
                    section.pd0{padding-top:0;padding-bottom:0;}
                    section.pds{padding-top:32px;padding-bottom:32px;}
                    section.pdm{padding-top:64px;padding-bottom:64px;}
                    section.pdl{padding-top:128px;padding-bottom:128px;}
                    section.pde{padding-top:172px;padding-bottom:172px;}
                    @media screen and (max-width: 500px){ .section.pdl, section.pde{padding-top:64px;padding-bottom:64px;} }
                    
                    /* button styles */
                    .btns,.btnl,.btn{transition:all 0.24s;margin-bottom:1rem;padding: 0.5rem 1.5rem;border: 1px solid var(--baseColorA);text-decoration: none;color: var(--txtColorA);display: inline-block;}
                    .btns{padding: 0.5rem 0.75rem;font-size: 0.8rem;line-height: 1rem;}
                    .btnl{padding: 1rem 2rem;font-size: 1.2rem;line-height: 1rem;}
                    .btns:hover,.btnl:hover,.btn:hover{background-color: var(--baseColorA);color: var(--txtColorC);}
                    
                    /* section{padding: 64px 16px;} */
                    .ql-align-center{text-align:center;}
                    .ql-align-right{text-align:right;}
                    .ql-align-left{text-align:left;}
                    
                    /* normalize */
                    section div{box-sizing: border-box;}

                    ${ css }

                    ${ Controls.page.css_rules }
                    
                    </style>
                </head>
                <body>
                    <div id="content">


                    </div>
                    <script>${ js }</script>
                    <script>
            
                        document.addEventListener("DOMContentLoaded", () => {
                                    
                            ${ js_cb }
                            	
                        });
            
                    </script>
                </body>
            </html>`;

            document.querySelector('.preview').srcdoc = this.page;
            document.querySelector('.preview').addEventListener('load', e => {
            
                // document.querySelector('.preview').contentWindow.document.body.style.opacity = '0.01';
                document.querySelector('.preview').style.opacity = '0.01';
            });

            if(self.state.timeoutIframe2) clearTimeout(self.state.timeoutIframe2);
            // if(self.state.timeoutIframeScroll) clearTimeout(self.state.timeoutIframeScroll);

            // document.querySelector('.preview').contentWindow.document.body.style.opacity = '0';
            self.state.timeoutIframe2 = setTimeout(() => {

                if(self.state.iframeScrollY){ document.querySelector('.preview').contentWindow.scrollTo({top: self.state.iframeScrollY, behavior: 'auto'}); }

                self.state.timeoutIframe2 = setTimeout(() => {

                    if(self.state.iframeScrollY){ document.querySelector('.preview').contentWindow.scrollTo({top: self.state.iframeScrollY, behavior: 'auto'}); }
                    // document.querySelector('.preview').contentWindow.document.body.style.opacity = '1';
                    document.querySelector('.preview').style.opacity = '1';
                    // document.querySelector('.preview').style.height = (document.querySelector('body').offsetHeight * 2 / 3) + 'px';
                    // document.querySelector('.preview').height = document.querySelector('.p-edit .accordion').offsetHeight + 'px';
                    // document.querySelector('.preview').style.height = document.querySelector('.p-edit .accordion').offsetHeight + 'px';

                    self.state.timeoutIframe2 = setTimeout(() => {

                        if(self.state.iframeScrollY){ document.querySelector('.preview').contentWindow.scrollTo({top: self.state.iframeScrollY, behavior: 'auto'}); }
                        document.querySelector('.preview').style.opacity = '1';
                    }, 3000);

                }, 1000);

                // auto resize preview height so it fits the screen height perfectly
                document.querySelector('.preview').style.height = (window.innerHeight * 2 / 3) + 'px';
                if(self.state.iframeScrollY){ document.querySelector('.preview').contentWindow.scrollTo({top: self.state.iframeScrollY, behavior: 'auto'}); }
                
                // document.querySelector('.preview').contentWindow.document.body.style.opacity = '1';
            }, 20);


            // alert(window.innerHeight);
            // document.querySelector('.preview').style.height = document.querySelector('.p-edit .accordion').offsetHeight + 'px';
            // alert(document.querySelector('.preview').height = document.querySelector('.p-edit > .row > .accordion').offsetHeight);
            // document.querySelector('.preview').height = document.querySelector('.p-edit > .row > .accordion').offsetHeight + 'px';
    }

    loadImages = (product) => {

        let d = document;
        let lang = 'en';
        let offer_id = '0';
        let id = getParam('id');
        let sid = spaceID();
        let t = '';
        for(let i=0;i<5;i++){
     
          let img = (product.img !== undefined && product.img[i] == 'true') ? 'https://preview.kenzap.cloud/S'+spaceID()+'/_site/images/product-'+product.id+'-'+(i+1)+'-100x100.jpeg?'+product.updated:'https://account.kenzap.com/images/placeholder.jpg';
          t+=`\
          <div class="p-img-cont float-start">\
            <p data-index="${i}">\
              <img class="p-img images-${i}" data-index="${i}" width="100" height="100" src="${img}" />\
              <span class="remove hd" title="${ __html('Remove') }">×</span>\
            </p>\
            <input type="file" name="img[]" data-type="search" data-index="${i}" class="file aif-${i} d-none">\
          </div>`;
        }
        
        d.querySelector(".ic").innerHTML = t;
    
        // new image listener
        onClick('.p-img-cont img', this.listeners.openImage);

        // new remove listener
        onClick('.p-img-cont .remove', this.listeners.removeImage);

        // image preview listener
        onChange('.p-img-cont .file', this.listeners.previewImage);
    
        // iterate all images
        for(let fi=0; fi<5; fi++){
    
            // async load image to verify if it exists on CDN 
            let image_url = CDN+'/S'+sid+'/product-'+id+'-'+(parseInt(fi)+1)+'-250.jpeg?'+product.updated;
            setTimeout(function(img, sel, _fi){
        
                let allow = true;
                if(typeof(product.img)!=="undefined"){ if(!product.img[_fi]) allow = false; }
                if(allow){

                    let i = new Image();
                    i.onload = function(){
                        d.querySelector(sel+_fi).setAttribute('src', img);
                        d.querySelector(sel+_fi).parentElement.querySelector('.remove').classList.remove('hd');
                    };
                    i.src=img;
                }
            }, 300, image_url, ".images-", fi );
        }
    }

    // general method for image upload
    uploadImages = () => {

        if( document.querySelector(".imgupnote") ) document.querySelector(".imgupnote").remove();

        let fi = 0;
        for( let fileEl of document.querySelectorAll(".file") ){

            fi += 1;

            let id = getParam('id');
            let sid = spaceID();

            let file = fileEl.files[0];
            if(typeof(file) === "undefined") continue;

            // TODO add global sizes setting 
            let fd = new FormData();
            // let sizes = document.querySelector("body").dataset.sizes;
            let sizes = '1000|500|250|100x100';

            fd.append('id', id);
            fd.append('sid', sid);
            fd.append('pid', id);
            fd.append('key', 'image');
            fd.append('sizes', sizes);
            // fd.append('field', file);
            fd.append('file', file);
            fd.append('slug', 'product-'+id+'-'+fi);
            fd.append('token', getCookie('kenzap_token'));

            // clear input file so that its not updated again
            file.value = '';

            this.state.ajaxQueue+=1;

            fetch("https://api-v1.kenzap.cloud/upload/",{
                body: fd,
                method: "post"
            })
            .then(response => response.json())
            .then(response => {

                this.state.ajaxQueue -= 1;
                if(response.success && this.state.ajaxQueue == 0){

                    toast( __html("Product updated") );

                    // hide UI loader
                    hideLoader();
                }
            });
        }
        
        // image upload notice
        if(this.state.ajaxQueue == 0){

            toast( __html("Product updated") );

            hideLoader();
        }
    }

    laodScript = (script) => {

        // if(tab4Loaded) return;
        let sjs = document.createElement("script");
        sjs.setAttribute("src", script+"?"+(new Date().getTime()));
        document.body.appendChild(sjs);
        // tab4Loaded = true;
    }
}

new Edit();