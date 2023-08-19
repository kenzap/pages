import { __html, __attr, toast, onChange, getCookie, spaceID, slugify } from '@kenzap/k-cloud';
import { EditSettings } from "../_/_cnt_page_edit_settings.js"

const CDN = 'https://kenzap-sites.oss-ap-southeast-1.aliyuncs.com';

/**
 * Renders site controls upon provides JSON structure. Most frequent controls are loaded within this style.
 * Other controls are mentioned for a reference to load async js helping methods when needed.
 *
 * @Class Controls
 */

export const Controls = {

  // state object
  data : {},

  // sections array
  page : {},

  // layouts cache
  layouts : {},

  // current section
  sec : {},

  // settings array, for template customizer
  settings : {},

  // callback function for live changes preview 
  cb : {},

  // listener object storage
  l : {},

  // html selector to output data
  sel : {},

  // action to pass to the frontend
  obj : { settingsCache: null },

  // current section
  section : '',

  /*
  * Initiate controls, assign listeners and pass HTML output to selector
  *
  * @param    {String}  selector  Example: .controls
  * @param    {String}  js        Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @return 	{HTML} 	  output    HTML element 
  * 
  */
  init : function(sel, js, cb, mode) {

    this.sel = sel;

    switch(mode){

      // multi section mode
      case 'single': this.initSectionSingle(sel, js, cb); break;

      // single section mode
      case 'sections': this.initSections(sel, js, cb); break;

      // customizer mode
      case 'settings': this.initSettings(sel, js, cb); break;
    }
  },
  
  /*
  * Initiate accordion of selectors where controls are nested
  *
  * @param    {String}    selector  Example: .controls
  * @param    {String}    js        Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @param    {Function}  cb        callback function
  * @param    {Boolean}   force     Force recreate section and its listeners
  * @return 	{HTML} 	    output    HTML element 
  * 
  */
  initSectionSingle : function(sel, js, cb, force = false) {

    // cache data locally
    this.data = js;

    // save globally
    this.cb = cb;

    // dependency state object
    this.l.dep = {};

    // reset prev section listeners
    this.l = {};

    // render
    let html = this.render(js);
    
    // output render to passed html selector
    if(document.querySelector(sel) && (document.querySelector(sel).innerHTML.length < 10) || force){ document.querySelector(sel).innerHTML = html; this.listeners(); }

    // assign listeners
  },

  /*
  * Initiate accordion of selectors where controls are nested
  *
  * @param    {String}    selector  Example: .controls
  * @param    {String}    js        Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @param    {Function}  cb        callback function
  * @return 	{HTML} 	    output    HTML element 
  * 
  */
  initSections : function(sel, js, cb) {

    // console.log(js);

    let _this = this;

    // set defaults
    if(js == undefined) js = { sections: [], title: "Page", page: {} };

    // cache data locally
    this.page = js;

    // save globally
    this.cb = cb;

    // no sections founds
    if(js.sections == undefined) return "";

    // output html sections
    let html = EditSettings(_this);

    // iterate sections
    let i = 0;
    for(let sec in js.sections){

      let s = js.sections[sec];

      html+=`
      <div class="card border-white shadow-sm lay br mb-2">
        <div class="card-header border-white bg-white p-0" role="tab" id="section${i}">
          <h6 class="mb-0 d-flex align-items-center justify-content-between">
            <a data-bs-toggle="collapse" href="#collapse${i}" data-section="${i}" aria-expanded="false" aria-controls="collapse${i}" class="seco collapsed text-dark ps-3 py-3 pe-3 text-decoration-none fs-5">
              ${s.data.title}
              <div class="tname text-secondary d-none" >${s.data.template} template</div>
            </a>
            <div class="row-actions-card">
              <div class="dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" data-acc="actions" data-section="${i}" class="bi bi-three-dots-vertical text-secondary acc acc2- contect dropdown-toggle po" id="actions-mennu${i}" data-bs-toggle="dropdown" aria-expanded="false" viewBox="0 0 16 16">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
                <ul class="dropdown-menu" aria-labelledby="actions-mennu${i}">
                  <li class="${ i == 0 ? 'd-none' : '' }">
                    <a class="dropdown-item acc d-flex justify-content-between align-items-center" data-acc="moveup" data-section="${i}" href="#">
                      <div>${ __html('Move Up') }</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                      </svg>
                    </a>
                  </li>
                  <li class="${ i == js.sections.length-1 ? 'd-none' : '' }">
                    <a class="dropdown-item acc d-flex justify-content-between align-items-center" data-acc="movedown" data-section="${i}" href="#">
                      <div>${ __html('Move Down') }</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item acc d-flex justify-content-between align-items-center" data-acc="copy" data-section="${i}" href="#">
                      <div>${ __html('Duplicate') }</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                        <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item acc d-flex justify-content-between align-items-center" data-acc="settings" data-section="${i}" href="#">
                      <div>${ __html('Advanced') }</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brush" viewBox="0 0 16 16">
                        <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z"/>
                      </svg>                  
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item acc d-flex justify-content-between align-items-center" data-acc="remove" data-section="${i}" href="#">
                      <div>${ __html('Delete') }</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </h6>
        </div>
        <div id="collapse${i}" class="collapse" role="tabpanel" aria-labelledby="section${i}" data-parent="#sections" style="">
          <div class="card-body">
              <div class="controls" data-section="${i}"></div>
          </div>
        </div>
      </div>`;

      i++;
    }

    // output render to passed html selector
    if(document.querySelector(sel)) document.querySelector(sel + ' .add-layout').insertAdjacentHTML("beforeBegin", html);

    // assign listeners
    let el = document.querySelectorAll(".seco");
    for (const a of el) {
      a.addEventListener('click', function(e) {

        // console.log("#collapse"+this.dataset.section+" .controls");
        _this.section = this.dataset.section;
        _this.initSectionSingle("#collapse"+this.dataset.section+" .controls", js.sections[this.dataset.section].data, _this.cb);
        return false;
      })
    }

    // action listeners
    [...document.querySelectorAll('.dropdown-item.acc')].forEach(el => {

      el.addEventListener('click', e => {

        e.preventDefault();

        let section = e.currentTarget.dataset.section;

        switch(e.currentTarget.dataset.acc){

          // move layout up
          case 'moveup': 
    
            // move layout section up
            _this.arrayMove(_this.page.sections, section, parseInt(section-1));
    
            // reassign listeners
            _this.sectionListeners(".acc2");
    
            // notify frontend
            _this.obj.action = 'section-moveup';
            _this.cb.call({action:'section-moveup'});
            
          break;
          // move layout down
          case 'movedown': 
    
            // move layout section up
            _this.arrayMove(_this.page.sections, section, parseInt(section)+1);

            // reassign listeners
            _this.sectionListeners(".acc2");
    
            // notify frontend
            _this.obj.action = 'section-movedown';
            _this.cb.call({action:'section-movedown'});
    
          break;
          // layout container settings
          case 'settings':
      
            $("#settings").attr('data-section',section);
            $("#settings").attr('data-source','settings');
            $("#settings").attr('data-acc','settings');
            $("#settings .layouts_body").html('');

            let settingsCache = '';

            // get settings structure
            if(!Controls.obj.settingsCache){
  
              settingsCache = `
              <div class="r row" data-key="">
                <div class="col-md-4">
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label"><i class="mdi mdi-arrow-collapse-horizontal"></i> Layout Width</label>
                    <div class="col-sm-12">
                      <input id="max-width" type="number" placeholder="1168" class="text-input form-control inps" value="1168"  >
                      <p class="form-text mt-2">Layout max width in pixels.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label"><i class="mdi mdi-arrow-expand-horizontal"></i> Side Paddings</label>
                    <div class="col-sm-12">
                      <input id="side-paddings" type="number" placeholder="16" class="text-input form-control inps" value="16"  >
                      <p class="form-text mt-2">Screen left and right offset margins.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4"> 
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label"><i class="mdi mdi-arrow-expand-vertical" ></i> Section Paddings</label>
                    <div class="col-sm-12">
                      <div class="form-check">
                        <label class="form-check-label"><input id="pd0" type="radio" class="form-check-input" value="pd0" name="pd-type" >Hidden <i class="input-helper"></i></label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label"><input id="pds" type="radio" class="form-check-input" value="pds" name="pd-type">Small <i class="input-helper"></i></label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label"><input id="pdm" type="radio" class="form-check-input" value="pdm" name="pd-type">Medium <i class="input-helper"></i></label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label"><input id="pdl" type="radio" class="form-check-input" value="pdl" name="pd-type">Large <i class="input-helper"></i></label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label"><input id="pde" type="radio" class="form-check-input" value="pde" name="pd-type">Extra Large <i class="input-helper"></i></label>
                      </div>
                      <p class="form-text mt-2"></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="r row" data-key="">

                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label"><i class="mdi mdi-image-outline"></i> Background image</label>
                    <div class="col-sm-12">
                      <input id="bg-image" type="text" class="text-input form-control inps" placeholder="https://static.kenzap.com/img/backg..."  >
                      <p class="form-text mt-2">Link to background image.</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label"><i class="mdi mdi-invert-colors" ></i> Background color</label>
                    <div class="col-sm-12">
                      <input id="bg-color" type="color" class="inps color-control form-control-color border-0 border-radius-0- p-0-" placeholder="#FEFEFE" value=""  >
                      <p class="form-text mt-2">Background color in HEX format.</p> 
                    </div>
                  </div>
                </div>

                <!--
                <div class="col-md-6"> 
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label">Background Type</label>
                    <div class="col-sm-12">
                      <div class="form-check">
                        <label class="form-check-label"><input id="bg-color" type="radio" class="form-check-input" value="color" name="bg-type" >Color <i class="input-helper"></i></label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label"><input id="bg-image" type="radio" class="form-check-input" value="image" name="bg-type">Image <i class="input-helper"></i></label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label"><input id="bg-gradient" type="radio" class="form-check-input" value="gradient" name="bg-type">Gradient <i class="input-helper"></i></label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label"><input id="bg-video" type="radio" class="form-check-input" value="video" name="bg-type">Video <i class="input-helper"></i></label>
                      </div>
                      <p class="form-text mt-2"></p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6"> 
                  <div class="form-group row">
                    <label class="col-sm-12 col-form-label">Result</label>
                    <div class="col-sm-12">
                      <div style="
                          width: 250px;
                          height: 140px;
                          border: 1px solid #ccc;
                          border-radius: 20px;
                          background: beige;
                          background-image: linear-gradient(140deg, indigo,violet);
                      ">jnj</div>
                      <p class="form-text mt-2"></p>
                    </div>
                  </div>
                </div> -->

              </div>`;
            }
  
            Controls.renderSettings(settingsCache, section);
            
          break;
          // duplicate layout
          case 'copy': 
    
            // copy data
            _this.page.sections.push(_this.page.sections[section]);
    
            // reassign listeners
            _this.sectionListeners(".acc2");
    
            // notify frontend
            _this.obj.action = 'section-copy';
            _this.cb.call({action:'section-copy'});
          
            toast(__html('section copied'));
          break;
          // remove layout
          case 'remove': 
    
            if(!confirm('Remove this section?')) return;
    
            _this.page.sections.splice(section, 1); 
    
            // notify frontend
            _this.obj.action = 'section-remove';
            _this.cb.call({action:'section-remove'});
    
            toast(__html('section removed'));
          break;
        }
      })
    });

    // page settings liteners
    let fontr = new XMLHttpRequest();
    fontr.onreadystatechange = function() {
    
      if (this.readyState == 4 && this.status == 200){

        try{
        
          let js = JSON.parse(this.responseText);
          let flist = ''; for(let f in js.items){ flist += '<option value="'+js.items[f].family+'">'+js.items[f].family+'</option>'; }

          document.querySelector("#font_heading").innerHTML = flist;
          document.querySelector("#font_body").innerHTML = flist;

          let value = "";
          if(document.querySelector('#font_heading [value="'+_this.page.typography.heading.font.value+'"]')) document.querySelector('#font_heading [value="'+_this.page.typography.heading.font.value+'"]').selected = true;
          if(document.querySelector('#font_body [value="'+_this.page.typography.body.font.value+'"]')) document.querySelector('#font_body [value="'+_this.page.typography.body.font.value+'"]').selected = true; 
          if(document.querySelector('#font_heading_type [value="'+_this.page.typography.heading.type.value+'"]')) document.querySelector('#font_heading_type [value="'+_this.page.typography.heading.type.value+'"]').selected = true;
          if(document.querySelector('#font_body_type [value="'+_this.page.typography.body.type.value+'"]')) document.querySelector('#font_body_type [value="'+_this.page.typography.body.type.value+'"]').selected = true; 
          if(document.querySelector('#font_heading_weight [value="'+_this.page.typography.heading.weight.value+'"]')) document.querySelector('#font_heading_weight [value="'+_this.page.typography.heading.weight.value+'"]').selected = true;
          if(document.querySelector('#font_body_weight [value="'+_this.page.typography.body.weight.value+'"]')) document.querySelector('#font_body_weight [value="'+_this.page.typography.body.weight.value+'"]').selected = true; 
          document.querySelector('#palette').innerHTML = _this.page.palette.map(palette => {

            return `<li> <input type="color" title="${ palette.title }" class="border border-secondary form-control form-control-color palette-color-control" data-key="baseColorA" value="${ palette.color }" style="width:40px;background-color:${ palette.color }" title="Choose your base color"> </li>`
          
          }).join('');

          onChange('#font_heading', e => {

            _this.page.typography.heading.font.value = e.currentTarget.value;  _this.cb.call({action:'edit'});
          });

          onChange('#font_body', e => {

            _this.page.typography.body.font.value = e.currentTarget.value; _this.cb.call({action:'edit'});
          });

          onChange('#font_heading_type', e => {

            _this.page.typography.heading.type.value = e.currentTarget.value; _this.cb.call({action:'edit'});
          });

          onChange('#font_body_type', e => {

            _this.page.typography.body.type.value = e.currentTarget.value;  _this.cb.call({action:'edit'});
          });

          onChange('#font_heading_weight', e => {

            _this.page.typography.heading.weight.value = e.currentTarget.value;  _this.cb.call({action:'edit'});
          });

          onChange('#font_body_weight', e => {

            _this.page.typography.body.weight.value = e.currentTarget.value;  _this.cb.call({action:'edit'});
          });

          onChange('#ptitle', e => {

            _this.page.title = e.currentTarget.value;  _this.cb.call({action:'edit'});
          });

          onChange('#pslug', e => {

            e.currentTarget.value = slugify(e.currentTarget.value);
            _this.page.slug = e.currentTarget.value; _this.cb.call({action:'edit'});
          });

          onChange('#pdesc', e => {

            _this.page.description = e.currentTarget.value;  _this.cb.call({action:'edit'});
          });

          onChange('#home_page', e => {

            _this.page.home_page = e.currentTarget.checked; 
            // if(_this.page.home_page){ document.querySelector('.access-cont').classList.add('d-none'); }else{ document.querySelector('.access-cont').classList.remove('d-none'); }
            _this.cb.call({action:'edit'});
          });

          onChange('#password_protect', e => {

            _this.page.password_protect = e.currentTarget.checked;
            _this.page.password_changes = true;
            if(_this.page.password_protect){

              _this.page.home_page = false;
              document.querySelector('.homepage-cont').classList.add('d-none');
              document.querySelector('.password-cont').classList.remove('d-none'); 
            }else{ 
              document.querySelector('.homepage-cont').classList.remove('d-none'); 
              document.querySelector('.password-cont').classList.add('d-none'); 
            }
            _this.cb.call({action:'edit'});
          });

          onChange('#password', e => {

            _this.page.password_changes = true;
            _this.page.password = e.currentTarget.value;  _this.cb.call({action:'edit'});
          });

          onChange('.palette-color-control', e => {

            [...document.querySelectorAll('.palette-color-control')].forEach((input, i) => {

              // console.log(i);
              _this.page.palette[i].color = input.value;

            });

            // console.log(_this.page.palette);

            _this.cb.call({action:'edit'});
          });

          onChange('#css_rules', e => {

            _this.page.css_rules = e.currentTarget.value;  _this.cb.call({action:'edit'});
          });

        }catch(e){

          console.log(e);
        }
      }
    };

    fontr.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw");
    fontr.send();
  },

  /*
  * Initialize 
  *
  * @param    {String}    selector  Example: .controls
  * @param    {String}    js        Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @param    {Function}  cb        callback function
  * @return 	{HTML} 	    output    HTML element 
  * 
  */
  initSettings : function(sel, js, cb) {

    let _this = this;

    // cache data locally
    this.settings = js;
    this.page = js;
    // console.log(js);

    // save globally
    this.cb = cb;

    // no sections founds
    if(js == undefined) return "";

    // output html sections
    let html = "";

    // iterate sections
    // let i = 0;
    for(let sec in js){

      let s = js[sec];
      let i = sec;
      if(s.hint == undefined) s.hint = '';
      if(s.title == undefined) s.title = 'Setting Tab';

      html+='\
      <div class="card border-white shadow-sm lay br">\
        <div class="card-header border-white bg-white" role="tab" id="section'+i+'">\
          <h6 class="mb-0">\
            <a data-bs-toggle="collapse" href="#collapse'+i+'" data-section="'+i+'" aria-expanded="false" aria-controls="collapse'+i+'" class="seco collapsed">\
              '+s.title+'\
              <div style="font-size:12px;margin-top:4px;color:#666;">'+s.hint+'</div>\
            </a>\
          </h6>\
        </div>\
        <div id="collapse'+i+'" class="collapse" role="tabpanel" aria-labelledby="section'+i+'" data-parent="#sections" style="">\
          <div class="card-body">\
              <div class="controls" data-section="'+i+'"></div>\
          </div>\
        </div>\
      </div>';
      // i++; 
    }

    // output render to passed html selector
    if(document.querySelector(sel)) document.querySelector(sel).innerHTML = html;

    // assign listeners
    let el = document.querySelectorAll(".seco");
    for (const a of el) {
      a.addEventListener('click', function(e) {

        _this.initSectionSingle("#collapse"+this.dataset.section+" .controls", _this.settings[this.dataset.section].data, _this.cb);
        return false;
      })
    }

    // init section listeners
    this.sectionListeners(".acc2");
  },

  // render builder settings
  renderSettings: (html, section) => {

    let modal = document.querySelector(".modal");
    let modalCont = new bootstrap.Modal(modal);
    
    modal.querySelector(".modal-title").innerHTML = __html('Advanced Settings');
    modal.querySelector(".modal-body").innerHTML = html;
    modal.querySelector(".modal-dialog").style.maxWidth = '700px';
    modal.querySelector(".modal-footer").innerHTML = `
      <button type="button" class="btn btn-primary btn-apply-set">${ __html('Apply') }</button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${ __html('Cancel') }</button>
    `;

    modalCont.show();

    // $(".mloader").fadeOut("fast");
    // $(".modal.show").find(".layouts_body").html(html);

    let c = Controls.page.sections[section].data.c;
    if(!c) c = {};

    console.log(c.section);
    
    // parse sections
    if(c.section) c.section.split(';').forEach(string => { const [key, value] = string.split(":");
      switch(key){
        case 'background-color': document.querySelector(".p-modal #bg-color").value = value; break;
        case 'bg-image': document.querySelector(".p-modal #bg-image").value = value; break;
      }
    });

    // parse container
    if(c.container) c.container.split(';').forEach(string => { const [key, value] = string.split(":");
      switch(key){
        case 'max-width': document.querySelector(".p-modal #max-width").value = value.match( /\d+/g ).join(''); break;
        case 'padding-left': document.querySelector(".p-modal #side-paddings").value = value.match( /\d+/g ).join(''); break;
      }
    });

    // parse classes
    if(c.classes) c.classes.split(' ').forEach(string => { 

      switch(string){
        case "pd0": $("#pd0").prop("checked", true); break;
        case "pds": $("#pds").prop("checked", true); break;
        case "pdm": $("#pdm").prop("checked", true); break;
        case "pdl": $("#pdl").prop("checked", true); break;
        case "pde": $("#pde").prop("checked", true); break;
      }
    });



    // console.log('renderSettings');

    Controls.applySettings(section);
  },

  // layouts setting apply click listener
  applySettings: (section) => {

    document.querySelector('.btn-apply-set').addEventListener('click', e => {

      e.preventDefault();

      // let section = parseInt($(".modal.show").attr("data-section"));

      Controls.page.sections[section].data.c = {};
      Controls.page.sections[section].data.c.section = "";
      Controls.page.sections[section].data.c.container = "";
      Controls.page.sections[section].data.c.classes = "";

      let mwidth = $(".modal.show").find("#max-width").val();
      let spadding = $(".modal.show").find("#side-paddings").val();
      let bgcolor = $(".modal.show").find("#bg-color").val();
      let pdtype = $(".modal.show").find('input[name="pd-type"]:checked').val();
      if(mwidth) Controls.page.sections[section].data.c.container += "max-width:"+mwidth+"px;";
      if(spadding) Controls.page.sections[section].data.c.container += "padding-left:"+spadding+"px;padding-right:"+spadding+"px;";
      if(bgcolor) Controls.page.sections[section].data.c.section += "background-color:"+bgcolor+";";
      if(pdtype) Controls.page.sections[section].data.c.classes += pdtype+" ";
      
      // console.log(mwidth);
      $(".btn-close").trigger('click');

      Controls.obj = {action:null};

      // notify frontend
      Controls.cb.call();

      // console.log(Controls.page.sections[section].data.c);
    });
  },
  /*
  * Change element position in the array.
  * Used by move up move down actions
  * 
  */
  arrayMove : function(arr, old_index, new_index) {

    var element = arr[old_index];
    arr.splice(old_index, 1);
    arr.splice(new_index, 0, element);
  },

  /*
  * sectionListeners
  * 
  */
  sectionListeners : function(acc_class) {

    let _this = this;

    // copy remove listener
    let acc = document.querySelectorAll(acc_class);
    for (const a of acc) {
      
      let args = { _this: _this, a: a };
      if (!a.dataset.lid){

        // assign ids to copy/remove buttons to prevent double assignment
        a.dataset.lid = _this.makeid(6);
        // a.addEventListener('click', _this.sectionClickList.bind(args));
      }
    }
  },

  /*
  * Recursive object search
  * @param    {String}  path  
  * @param    {JSON}    obj      
  * @return 	{JSON} 	  output   
  * 
  */
  resolve : function(path, obj) {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
  }, 

  /*
  * Parse main json object of the template 
  * loads dependencies.
  *
  * @param    {String}  js      Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @return 	{HTML} 	  output  HTML element 
  * 
  */
  render : function(js) {

    // console.log(js);

    // test data
    let output = "", outputF = "";
    this.iterate(js, function(o){ if(o) output += o; });

    // group elements, such as rows or tabs
    var wrapper = document.createElement('div');
    wrapper.innerHTML = output;
    let rows = wrapper.querySelectorAll(".r.row");
    let lastRow = '', addNewLink = '';
    let rowOpen = false;

    let actions = (key) => {
      
      let i = 0;
      return `
        <div class="row-actions">
          <div class="dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" data-acc="actions" data-section-item="${key}" class="bi bi-three-dots-vertical text-secondary acc acc2- contect dropdown-toggle po" id="actions-mennu${i}" data-bs-toggle="dropdown" aria-expanded="false" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
            <ul class="dropdown-menu" aria-labelledby="actions-mennu${i}">
              <li class="${ i == 0 ? 'd-none' : '' }">
                <a class="dropdown-item acc-item d-flex justify-content-between align-items-center" data-acc="moveup" data-section-item="${key}" href="#">
                  <div>${ __html('Move Up') }</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                  </svg>
                </a>
              </li>
              <li class="${ i == 0 ? 'd-none' : '' }">
                <a class="dropdown-item acc-item d-flex justify-content-between align-items-center" data-acc="movedown" data-section-item="${key}" href="#">
                  <div>${ __html('Move Down') }</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                  </svg>
                </a>
              </li>
              <li class="d-none">
                <a class="dropdown-item acc-item d-flex justify-content-between align-items-center" data-acc="copy" data-section-item="${key}" href="#">
                  <div>${ __html('Duplicate') }</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                  </svg>
                </a>
              </li>
              <li>
                <a class="dropdown-item acc-item d-flex justify-content-between align-items-center" data-acc="remove" data-section-item="${key}" href="#">
                  <div>${ __html('Delete') }</div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        `;
    }

    let addItemLink = (addNewLink, key, outputF) => {

      if(addNewLink != key && addNewLink != ''){ outputF += `<a class="acc-item-add" href="#">+ ${ addNewLink }</a>`; addNewLink = key; }

      return outputF;
    }

    for(const row of rows){

      // console.log(row);

      // skip rows outside top hierarchy 
      if(row.dataset.key == undefined) continue;

      let keyArr = row.dataset.key.split(".");
      let key = keyArr.length == 2 ? keyArr[0] : row.dataset.key;
      let keyIndex = parseInt(keyArr[1]); if(Number.isInteger(keyIndex)) keyIndex += 1;

      // multi row control
      if(key){

        let keyTitle = keyArr[0][0].toUpperCase() + keyArr[0].slice(1).toLowerCase()+" #"+keyIndex;

        // multi row control container
        if(lastRow != row.dataset.key){ 

          // close prev row 
          if(rowOpen){

            outputF = addItemLink(addNewLink, key, outputF);

            outputF += '</div>'; rowOpen = false; 
          }

          // open new row
          outputF += '<div class="row-cont" data-key="'+row.dataset.key+'"><div class="row-click"><span>'+keyTitle+'</span>'+actions(row.dataset.key)+'</div>'; rowOpen = true; 
        }

      // single control
      }else{
 
        // control already rendered
        if(rowOpen){ 

          outputF = addItemLink(addNewLink, key, outputF);
          
          outputF += '<br></div>'; rowOpen = false; 
        }
      }

      // if(addNewLink != key) 
      addNewLink = key;
      lastRow = row.dataset.key; 
      outputF += row.outerHTML;
    }

    // close rows if any
    if(rowOpen){

      outputF = addItemLink(addNewLink, '', outputF);

      outputF += '<br></div>'; rowOpen = false; 
    }
    
    return outputF;
  },

  /*
  * Get through eligible elements of the array
  *
  * @param    {String}  js      Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @return 	{HTML} 	  output  HTML element 
  * 
  */
  keys : [],
  iterate : function(o, fn) {

    // console.log(this.keys);
    fn.apply(this, [this.assignIds()]);  
    for (var i in o) {
  
      // console.log(this.keys);
      // console.log(o[i]);
      // console.log(o[i] instanceof Array);
      if (o[i] !== null && typeof(o[i])=="object") {
        this.keys.push(i);
        this.iterate(o[i], fn);
      }
    }
    this.keys.pop();
  },

  /*
  * Get through eligible elements of the array
  *
  * @param    {String}  js      Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @return 	{HTML} 	  output  HTML element 
  * 
  */
  assignIds : function() {

    let _this = this;
    let k = _this.keys;
    let obj = {};
    switch(k.length){

      // can not access array elements programmatically. Making this mess below to assign IDs to each JSON object element
      case 0: obj = _this.data;  break;
      case 1: if(_this.data[k[0]].input && _this.data[k[0]].id == undefined){ _this.data[k[0]].id = _this.makeid(); } obj = _this.data[k[0]];  break;
      case 2: if(_this.data[k[0]][k[1]].input && _this.data[k[0]][k[1]].id == undefined){ _this.data[k[0]][k[1]].id = _this.makeid(); } obj = _this.data[k[0]][k[1]]; break;
      case 3: if(_this.data[k[0]][k[1]][k[2]].input && _this.data[k[0]][k[1]][k[2]].id == undefined){ _this.data[k[0]][k[1]][k[2]].id = _this.makeid(); } obj = _this.data[k[0]][k[1]][k[2]]; break;
      case 4: if(_this.data[k[0]][k[1]][k[2]][k[3]].input && _this.data[k[0]][k[1]][k[2]][k[3]].id == undefined){ _this.data[k[0]][k[1]][k[2]][k[3]].id = _this.makeid(); } obj = _this.data[k[0]][k[1]][k[2]][k[3]]; break;

      default: return false;
    }

    // return _this.controls(k.slice(-1)[0], obj);
    return _this.controls(k.join("."), obj);
  },

  /*
  * Remove object keys with data. Used to sanitize data stracture before duplicate operations  
  *
  * @param    {JSON}    obj     Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @param    {Array}   keys    Example: id
  * @return 	{HTML} 	  output  HTML element 
  * 
  */
  removeProps : function(obj, keys){
    let _this = this;
    if(obj instanceof Array){
      obj.forEach(function(item){
        _this.removeProps(item,keys)
      });
    }
    else if(typeof obj === 'object'){
      Object.getOwnPropertyNames(obj).forEach(function(key){
        if(keys.indexOf(key) !== -1)delete obj[key];
        else _this.removeProps(obj[key],keys);
      });
    } 
  },

  /*
  * Update object ids. Used to sanitize data stracture before duplicate operations  
  *
  * @param    {JSON}    obj     Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @param    {Array}   soft    if set to true create ids only when they are 
  * @return 	{HTML} 	  output  HTML element 
  * 
  */
  updateIDs : function(obj){
    let _this = this;
    if(obj instanceof Array){
      obj.forEach(function(item){
        _this.updateIDs(item)
      });
    }else if(typeof obj === 'object'){
      Object.getOwnPropertyNames(obj).forEach(function(key){
        // if(['id'].indexOf(key) !== -1) obj[key] = _this.makeid(6);
        if(key == 'id') obj[key] = _this.makeid();
        else _this.updateIDs(obj[key]);
      });
    } 
  },

  /*
  * Set updated value to gloval data object
  *
  * @param    {String}  js      Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @return 	{HTML} 	  output  HTML element 
  * 
  */
  setJSV : function(v, k, e) {

    let _this = this;  

    // console.log("setJSV "+k+" - "+v);

    // get current section
    let c = document.querySelector("#"+e.id).closest('.controls')
    _this.sec = c.dataset.section; 

    // assign value to global data object
    k = k.split('.');
    switch(k.length){

      case 1: if(_this.data[k[0]]) _this.data[k[0]].value = v;  break;
      case 2: if(_this.data[k[0]][k[1]]) _this.data[k[0]][k[1]].value = v; break;
      case 3: if(_this.data[k[0]][k[1]][k[2]]) _this.data[k[0]][k[1]][k[2]].value = v; break;

      default: return false;
    }

    // notify frontend
    _this.obj.action = 'edit';
    _this.cb.call({action:'edit'});
  },

  /*
  * Finds closest parent node by selector
  */
  findParentNode : function(elm, selector) {

    var all = document.querySelectorAll(selector);
    var cur = elm.parentNode;
    while(cur && !collectionHas(all, cur)) { //keep going up until you find a match
        cur = cur.parentNode; //go up
    }
    return cur; //will return null if not found
  },

  /*
  * Iterates through list of available controls and 
  * loads dependencies.
  *
  * @param    {String}  key     Example: color_1 
  * @param    {String}  js      Example: { "title":"Site title", "input":"text", "val": "Website Template"}
  * @return 	{HTML} 	  output  HTML element 
  * 
  */
  fonts : null,
  controls : function(key, js){

    // console.log('controls');
    
    // only parse input controls
    if(js.input == undefined) return;

    // set defaults
    js.default = js.default == undefined ? "" : js.default;
    js.value = js.value == undefined ? "" : js.value;
    js.title = js.title == undefined ? "" : js.title;
    js.hint = js.hint == undefined ? "" : js.hint;

    let _this = this;
    let id = js.id;
    let value = js.value == "" ? js.default : js.value;

    // row key
    // var key = key.lastIndexOf('.');
    let key_row = key.substr(0, key.lastIndexOf('.'))

    switch(js.input){

      case 'text':

        // listener
        this.l.text = function(){

          let input = document.querySelectorAll('#collapse'+_this.section+' .controls .text-input');
          for (const a of input) {
            a.addEventListener('keyup', function(e) {

              _this.setJSV(this.value, this.dataset.key, this);
              return false;
            })
          }
        }
  
        // html struct
        return '\
          <div class="r row" data-key="'+key_row+'">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                <div class="col-sm-12">\
                  <input id="'+id+'" type="text" data-key="'+key+'" data-type="'+js.input+'" class="text-input form-control inps" value="'+value+'" name="'+id+'" >\
                  <p class="form-text mt-2">'+js.hint+'</p>\
                </div>\
              </div>\
            </div>\
          </div>';

      case 'textarea': 

        // defaults
        js.rows = js.rows == undefined ? "6" : js.rows;

        // listener
        this.l.textarea = function(){

          let input = document.querySelectorAll('#collapse'+_this.section+' .controls .textarea-input');
          for (const a of input) {
            a.addEventListener('keyup', function(e) {

              _this.setJSV(this.value, this.dataset.key, this);
              return false;
            })
          }
        }

        // html struct
        return '\
          <div class="r row" data-key="'+key_row+'">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                <div class="col-sm-12">\
                  <textarea id="'+id+'" data-key="'+key+'" data-type="'+js.input+'" class="textarea-input form-control inps" maxlength="400" rows="'+js.rows+'">'+value+'</textarea>\
                  <p class="form-text mt-2">'+js.hint+'</p>\
                </div>\
              </div>\
            </div>\
          </div>';

      case 'number': 

        // listener
        this.l.number = function(){

          let input = document.querySelectorAll(".number-input");
          for (const a of input) {
            a.addEventListener('keyup', function(e) {

              _this.setJSV(this.value, this.dataset.key, this);
              return false;
            })
          }
        }

        return '\
          <div class="r row" data-key="'+key_row+'">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                <div class="col-sm-12">\
                  <input id="'+id+'" type="number" data-key="'+key+'" data-type="'+js.input+'" class="number-input form-control inps" value="'+value+'" name="'+id+'" >\
                  <p class="form-text mt-2">'+js.hint+'</p>\
                </div>\
              </div>\
            </div>\
          </div>';

      case 'range': 

        // listener
        this.l.range = function(){

          // callback after dependencies loaded
          let rcb = function cbf() {
            $('#collapse'+_this.section+' .controls .range-input').each( function( i, elem ) {

              // console.log(elem.classList.contains('noUi-target'));
              if(elem.classList.contains('noUi-target')) return;
              let _cb = this;
              let range = noUiSlider.create(elem, {
                start: [parseInt(elem.dataset.value)],
                connect: [true, false],
                tooltips: [true],
                decimals: false,
                range: {
                  'min': [parseInt(elem.dataset.min)],
                  'max': [parseInt(elem.dataset.max)]
                },
                format: {
                  to: (v) => parseFloat(v).toFixed(0),
                  from: (v) => parseFloat(v).toFixed(0)
                },
                step: 1,
              }, true);
              
              range.on('set.one', function (values, handle) {

                _this.setJSV(values[0], _cb.dataset.key, _cb);
              });
              
              range.on('update', function(values, handle) {

               _cb.parentElement.querySelector(".range-output").innerHTML = " "+parseInt(values[0]);
              });
            });
          }

          // range ui slider dependencies 
          _this.loadDependencies('nouislider.min.js', rcb);
          _this.loadDependencies('nouislider.min.css');
        }

        // set defaults
        js.min = js.min == undefined ? 0 : js.min;
        js.max = js.max == undefined ? 100 : js.max;
        value == "" ? (js.min + js.max) / 2 : value;

        // if(typeof(js.min)=="undefined") console.log("");
        // console.log(js.min);
        return '<div class="r row" data-key="'+key_row+'">\
          <div class="col-md-12">\
            <div class="form-group row">\
              <label class="col-sm-6 col-form-label">'+js.title+'</label>\
              <div class="col-sm-12">\
                <div id="'+id+'" data-min="'+js.min+'" data-value="'+value+'" data-max="'+js.max+'" data-key="'+key+'" data-type="'+js.input+'" class="range-input ul-slider slider-primary"></div>\
                <p class="form-text mt-2">'+js.hint+'<span class="range-output"><span></p>\
              </div>\
            </div>\
          </div>\
        </div>';

      case 'radio':

        // listener
        this.l.radio = function(){

          let input = document.querySelectorAll('#collapse'+_this.section+' .controls .radio-input');
          for (const a of input) {
            a.addEventListener('change', function(e) {

              _this.setJSV(this.value, this.dataset.key, this);
              return false;
            })
          }
        }

        // pre-render radio input list
        let rl = '';
        for(let o in js.options){

          // console.log(js);
          rl += '\
          <div class="form-check">\
            <label class="form-check-label"><input id="'+id+o+'" data-key="'+key+'" data-type="'+js.input+'" type="radio" class="radio-input form-check-input" '+((value==js.options[o]['key'])?"checked":"")+' name="'+key+'" value="'+js.options[o]['key']+'">'+js.options[o]['value']+' <i class="input-helper"></i></label>\
          </div>';
        }
  
        // html struct
        return '\
          <div class="r row" data-key="'+key_row+'">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                <div class="col-sm-12">'+rl+'\
                  <p class="form-text mt-2">'+js.hint+'</p>\
                </div>\
              </div>\
            </div>\
          </div>';

      case 'font':

        // listener
        this.l.font = function(){

          let input = document.querySelectorAll('#collapse'+_this.section+' .controls .font-input');
          for (const a of input) {
            a.addEventListener('change', function(e) {

              _this.setJSV(this.value, this.dataset.key, this);
              return false;
            })
          }
        }

        if(!_this.fonts){
          
          let fontr = new XMLHttpRequest();
          fontr.onreadystatechange = function() {
          
            if (this.readyState == 4 && this.status == 200) {

              try{
                
                let js = JSON.parse(this.responseText);
                // _this.fonts = js.items;

                let flist = ''; for(f in js.items){flist += '<option value="'+js.items[f].family+'">'+js.items[f].family+'</option>';}
                _this.fonts = flist;

                document.querySelector("#"+id).innerHTML = flist;
                document.querySelector("#"+id+' [value="'+value+'"]').selected = true; 

              }catch(e){

              }
            }
          };

          fontr.open("GET", "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBwIX97bVWr3-6AIUvGkcNnmFgirefZ6Sw");
          fontr.send();
        }else{

          setTimeout(function(){

            document.querySelector("#"+id).innerHTML = _this.fonts;
            document.querySelector("#"+id+' [value="'+value+'"]').selected = true;
          },50);
        }

        // html struct
        return '\
          <div class="r row" data-key="'+key_row+'">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                <div class="col-sm-12">\
                  <select id="'+id+'" data-key="'+key+'" data-type="'+js.input+'" class="font-input form-control" >\
                    \
                  </select>\
                  <p class="form-text mt-2">'+js.hint+'</p>\
                </div>\
              </div>\
            </div>\
          </div>';

          
      case 'richtext': 

          // listeners
          this.l.richtext = function(){
  
            // console.log("pre Quill");

            // callback after dependencies loaded
            let cbf = function cbf() {

              $('#collapse'+_this.section+' .controls .richtext-input').each(( i, elem ) => {

                // console.log("Quill");
                // init rich text input 
                let quill = new Quill(elem, {
                  modules: { 
                    toolbar: [
                    ['bold', 'italic', 'strike', 'link'], [{'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'align': [] }], [{ 'color': [] }, { 'background': [] }]]
                    ,clipboard: {
                      // matchVisual: false
                    } 
                  },
                  theme: 'snow'
                });
  
                quill.on('text-change', function(delta, oldDelta, source) {

                  let _cb = quill.container.parentElement.querySelector('#collapse'+_this.section+' .controls .richtext-input');
                  
                  // clean garbage
                  let text = quill.container.firstChild.innerHTML;
                  text = text.replace('<p><br></p>','');
                  text = text.replace('<h1><br></h1>','');
                  text = text.replace('<h2><br></h2>','');
                  text = text.replace('<h3><br></h3>','');
                  text = text.replace('<h4><br></h4>','');
                
                  // console.log(_cb.id);
                  _this.setJSV(text, _cb.dataset.key, _cb);
                });
              });
            }
  
            // color picker dependencies 
            _this.loadDependencies('quill.min.js', cbf);
            _this.loadDependencies('quill.snow.css');
          }
        
          return '\
            <div class="r row" data-key="'+key_row+'">\
              <div class="col-md-12">\
                <div class="form-group row">\
                  <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                  <div class="col-sm-12">\
                    <div class="richtext-wrap">\
                      <div id="'+id+'" data-key="'+key+'" data-type="'+js.input+'" name="'+id+'_'+key+'" class="richtext-input inps">'+value+'</div>\
                      <p class="form-text mt-2">'+js.hint+'</p>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>';

      case 'toggle':

            // listener
            this.l.toggle = function(){
    
              let input = document.querySelectorAll('#collapse'+_this.section+' .controls .switch_label');
              for (const a of input) {
                a.addEventListener('click', function(e) {
    
                  e.preventDefault();
                  
                  let inp = document.querySelector("#"+this.dataset.id);
                  _this.triggerClick(inp);
                  _this.setJSV(inp.checked, inp.dataset.key, inp);
                  
                  return false;
                })
              }
            }

            // html struct
            return '\
              <div class="r row" data-key="'+key_row+'">\
                <div class="col-md-12">\
                  <div class="form-group row">\
                    <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                    <div class="col-sm-12">\
                      <div class="switch">\
                        <input id="'+id+'" data-key="'+key+'" data-type="'+js.input+'" class="toggle-input switch_input" type="checkbox" data-val="'+key+'" value="'+value+'" '+(Boolean(value)==true?'checked':'')+'>\
                        <label aria-hidden="true" class="switch_label" data-id="'+id+'" for="toggle-input"></label>\
                        <div aria-hidden="true" class="switch_marker"></div>\
                      </div>\
                      <p class="form-text mt-2">'+js.hint+'</p>\
                    </div>\
                  </div>\
                </div>\
              </div>';

      case 'color': 

        // listeners
        this.l.color = function(){

          // callback after dependencies loaded
          let cb = function cbf() {
            $('#collapse'+_this.section+' .controls .color-input').each( function( i, elem ) {

              let _cb = this;
              let hueb = new Huebee( elem, {  } );
              hueb.on('change', function(color) {

                _this.setJSV(_cb.value, _cb.dataset.key, _cb);
              }); 
            });
          }

          // color picker dependencies 
          _this.loadDependencies('huebee.min.js', cb);
          _this.loadDependencies('huebee.min.css');
        }
      
        return '\
          <div class="r row" data-key="'+key_row+'">\
            <div class="col-md-12">\
              <div class="form-group row">\
                <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                <div class="col-sm-12">\
                  <div class="asColorPicker-wrap">\
                    <input type="text" id="'+id+'" data-key="'+key+'" data-type="'+js.input+'" class="color-input inps" name="'+id+'_'+key+'" value="'+value+'" style="border:0;">\
                  </div>\
                  <p class="form-text mt-2">'+js.hint+'</p>\
                </div>\
              </div>\
            </div>\
          </div>';
          
      case 'icon':  
      case 'image': 

          js.sizes = js.sizes == undefined ? ["600","1200x500"] : js.sizes;
          let sizestxt = ""; js.sizes.forEach(function(entry) { sizestxt+=entry+'|'; }); sizestxt = sizestxt.substr(0, sizestxt.length-1);

          // console.log(sizestxt);
          // listeners
          this.l.image = function(){

            // image click listener
            let ip = document.querySelectorAll('#collapse'+_this.section+' .controls .image-preview');
            for (const a of ip) {
              a.addEventListener('click', function(e) {
  
                // console.log(this.dataset.id);

                let inp = document.querySelector('#collapse'+_this.section+' .controls #u_'+this.dataset.id); //.closest('.controls')
                _this.triggerClick(inp);

                // _this.setJSV(this.value, this.dataset.key, this);
                return false;
              });
            }

            // image upload callback
            let iu = function(iid, file){

              let fd = new FormData();
              let sizes = document.querySelector("#"+iid).dataset.sizes;

              let id = _this.getId();

              // console.log(spaceID());

              fd.append('id', iid);
              fd.append('sid', spaceID());
              fd.append('pid', 0);
              fd.append('key', 'image');
              fd.append('sizes', sizes);
              // fd.append('field', file);
              fd.append('file', file);
              fd.append('slug', id+'-'+iid);
              fd.append('token', getCookie('kenzap_token'));
              
              // init progress bar 
              document.querySelector("#p_"+iid).style.display = "block";
              document.querySelector("#p_"+iid+" > div").style.width = "0%";

              // upload to backend
              $.ajax({
                xhr: function () {
                  var xhr = new window.XMLHttpRequest();
                  xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        
                        document.querySelector("#p_"+iid+" > div").style.width = parseInt(percentComplete * 100)+'%';
                        if(percentComplete == 1) setTimeout(function(){ document.querySelector("#p_"+iid).style.display = "none"; },500);
                    }
                  }, false);
                  xhr.addEventListener("progress", function (evt) {
                  if (evt.lengthComputable) {
                      var percentComplete = evt.loaded / evt.total;

                      document.querySelector("#p_"+iid+" > div").style.width = parseInt(percentComplete * 100)+'%';
                      if(percentComplete == 1) setTimeout(function(){ document.querySelector("#p_"+iid).style.display = "none"; },500);
                  }
                  }, false);
                  return xhr;
                },
                url: window.location.host.indexOf("localhost") == 0 ? 'https://api-v1-dev.kenzap.cloud/upload/' : 'https://api-v1.kenzap.cloud/upload/',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response){
          
                  var js = JSON.parse(response);
                  console.log(response);
                  if(js.success){

                    // update values
                    let _icb = document.querySelector("#"+iid);
                    let icbv = js.format == 'svg' ? CDN+'/S'+spaceID()+'/'+id+'-'+iid+'.svg' : CDN+'/S'+spaceID()+'/'+id+'-'+iid+'-'+sizes.split('|')[0]+'.webp';

                    // let icbv = '/images/'+iid+'-'+sizes.split('|')[0]+'.jpeg';
                    // console.log(iid+" "+icbv);
                    _this.setJSV(icbv, _icb.dataset.key, _icb);
                  }
                },
              });
            }

            // image preview listener
            let iup = document.querySelectorAll('#collapse'+_this.section+' .controls .image-upload');
            for (const a of iup) {
              a.addEventListener('change', function(e) {

                // console.log("image-upload preview");
                if (this.files && this.files[0]) {
            
                  // if icon only vector is allowed
                  // if(this.files[0])

                  let fl = this;
                  let reader = new FileReader();
                  reader.onload = function(e) {
                    
                    let im = document.querySelector("#i_"+fl.dataset.id);
                    if(im) im.setAttribute("src", e.target.result);

                    // upload image
                    iu(fl.dataset.id, fl.files[0]);
                  }
                  reader.readAsDataURL(fl.files[0]);
                }
              });
            }
          }

          let src;
          if(!value.includes("static")){
            src = ((value.length < 5) ? 'https://kenzap.com/account/images/placeholder.jpg':value)
          }else{
            src = value;
          }
          src += '?' + _this.page.updated;

          return '\
            <div class="r row" data-key="'+key_row+'">\
              <div class="col-md-12">\
                <div class="form-group row">\
                  <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                  <div class="col-sm-12">\
                    <div>\
                      <div class="file-search-img image-cont image-preview" data-id="'+id+'">\
                        <img id="i_'+id+'" class="image" data-key="'+key+'" data-type="'+js.input+'" src="'+src+'"/>\
                        <div id="p_'+id+'" class="progress">\
                          <div class="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>\
                        </div>\
                      </div>\
                      <input id="u_'+id+'" data-id='+id+' type="file" name="img[]" data-key="'+key+'" data-type="'+js.input+'" name="'+id+'_'+key+'" class="image-upload"></input>\
                      <input id="'+id+'" type="hidden" data-key="'+key+'" data-sizes="'+sizestxt+'" data-type="'+js.input+'" class="image-input image-val inps" value="'+js.default+'"></input>\
                      <p class="form-text mt-2">'+js.hint+'</p>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>';

      case 'csseditor': 

          // listeners
          this.l.csseditor = function(){

            // callback after dependencies loaded
            let cb = function cbf() {
              $('#collapse'+_this.section+' .controls .csseditor-input').each( function( i, elem ) {

                let _cb = this;
                let csseditor = ace.edit(_cb.id);
                csseditor.setTheme("ace/theme/monokai");
                csseditor.getSession().setMode("ace/mode/css");
                // document.getElementById('ace_css');
                // $(".cssclass").html(layout['meta']['class']); 
                // editor['css'].setValue(layout['css']);
                csseditor.on('change', function() {

                  _this.setJSV(csseditor.getValue(), _cb.dataset.key, _cb);
                }); 
              });
            }

            // color picker dependencies 
            _this.loadDependencies('ace.min.js', cb);
            _this.loadDependencies('ace.min.css');
          }

          return '\
            <div class="r row" data-key="'+key_row+'">\
              <div class="col-md-12">\
                <div class="form-group row">\
                  <label class="col-sm-6 col-form-label">'+js.title+'</label>\
                  <div class="col-sm-12">\
                    <div class="asColorPicker-wrap">\
                      <textarea id="'+id+'" data-key="'+key+'" data-type="'+js.input+'" class="csseditor-input inps w-400" name="'+id+'_'+key+'">'+value+'</textarea>\
                    </div>\
                    <p class="form-text mt-2">'+js.hint+'</p>\
                  </div>\
                </div>\
              </div>\
            </div>';
    }
    return '';
  },

  /*
  * Retrieve data. Used by style.js or other scripts
  *
  * @param    
  * @return 	{JSON} 	output  
  * 
  */
  getData : function(){

    return this.data;
  },

  /*
  * Retrieve settings data. Used by settings.js or other scripts
  *
  * @param    
  * @return 	{JSON} 	output  
  * 
  */
  getSettings : function(){

    return this.settings;
  },

  /*
  * Get site ID
  *
  * @param    
  * @return 	{JSON} 	output  
  * 
  */
  getId : function(){

    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('sid') ? urlParams.get('sid') : "";

    return id;
  },

  /*
  * Generate random id with custom length
  *
  * @param    {String}  l       id length
  * @return 	{String} 	output  string
  * 
  */
  makeid : function(length = 12){

    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  /*
  * Initiate controls listeners
  *
  * @param    
  * @return 	{String} 	output  string
  * 
  */
  listeners : function(){

    let _this = this;

    // iterate JSON
    for (let k in this.l) {

      if(typeof this.l[k] === 'function') this.l[k].call();
    }

    // row click listener
    let el = document.querySelectorAll('#collapse'+_this.section+' .controls .row-click');
    for (const a of el){
      setTimeout(function(){

        a.addEventListener('click', function(e) {

          if(a.dataset.block == "true"){ e.preventDefault(); return false; }

          if(!a.dataset.display){ a.dataset.display = "yes"; }else{ a.dataset.display = ""; }
          let rows = a.parentNode.querySelectorAll(".r.row");
          for (const row of rows) {

            if(!row.dataset.display){
              row.style.display = "flex";
              row.dataset.display = "yes";
            }else{
              row.style.display = "none";
              row.dataset.display = "";
            }
          }
          return false;
        })
      }, 10);
    }

    // let rowitem = document.querySelectorAll('#collapse'+_this.section+' .controls .row-cont');
    [...document.querySelectorAll('#collapse'+_this.section+' .controls .row-cont')].forEach(el => {

        // 3 dots click in array
        el.querySelector('.row-actions .dropdown').addEventListener('click', e => {

          // console.log('click');
          e.currentTarget.parentElement.parentElement.dataset.block = "true";
          setTimeout((pel) => { pel.dataset.block = ""; }, 100, e.currentTarget.parentElement.parentElement);

          // action click
          [...e.currentTarget.querySelectorAll('.row-actions .acc-item')].forEach(eli => {

            eli.addEventListener('click', e => {

              switch(e.currentTarget.dataset.acc){

                case 'remove':

                  if(!confirm('Remove?')) return;

                  let section = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.section;
                  let keyArr = e.currentTarget.dataset.sectionItem.split(".");
                  _this.page.sections[section].data[keyArr[0]].splice(keyArr[1], 1); 
      
                  // notify frontend
                  _this.obj.action = 'section-item-remove';
                  _this.cb.call({action:'section-item-remove'});

                  _this.initSectionSingle("#collapse"+section+" .controls", _this.page.sections[section].data, _this.cb, true);

                break;
              }
            });
          });
        });

        // add new click
        [...el.querySelectorAll('.acc-item-add')].forEach(eli => {

          eli.addEventListener('click', e => {

            e.preventDefault();
            
            let section = e.currentTarget.parentElement.parentElement.dataset.section;

            let keyArr = e.currentTarget.parentElement.dataset.key.split(".");

            console.log(keyArr[0]);
            console.log(_this.page.sections[section].data[keyArr[0]]);

            _this.page.sections[section].data[keyArr[0]].push(_this.page.sections[section].data[keyArr[0]][0]);

            _this.initSectionSingle("#collapse"+section+" .controls", _this.page.sections[section].data, _this.cb, true);

            toast(__html('added') + section);
          });
        });
    });


    // acc-item-add
  
    // row actions | copy remove listener
    // let rowacc = document.querySelectorAll('#collapse'+_this.section+' .controls .acc-item');
    // for (const a of rowacc) {
      
    //   let args = { _this: _this, a: a };
    //   if (!a.dataset.rid){

    //     // assign ids to copy/remove buttons to prevent double assignments
    //     a.dataset.rid = _this.makeid(6);
    //     // a.addEventListener('click', function(e){ e.preventDefault(); return false; });
    //     a.addEventListener('click', _this.rowitemClickList.bind(args, this));
    //   }
    // }
  },

  /*
  * Search for object by id recursively
  *
  * @param    
  * @return 	{Json} 	output  string
  * 
  */
  findNodeById : function(id, object) {

    let value;
    let e = this;
    Object.keys(object).some(function(k) {

        if (object[k].id === id) {
            value = object[k];
            return true;
        }

        if (object[k] && typeof object[k] === 'object') {
            value = e.findNodeById(id, object[k]);
            return value !== undefined;
        }
    });
    return value;
  },

  /*
  * Load additional JS or CSS depencies from sites/js/controls folder
  *
  * @param    dep       dependecy. Ex.: hiebee.min.js 
  * @param    cb        function to call after script is loaded (optional)       
  * @return 	{Boolen} 	result status 
  * 
  */
  loadDependencies : function(dep, cb) {

    // dependency already loaded, skip
    if(document.getElementById(dep)){ if(typeof cb === 'function') cb.call(); return; }

    // detect dependency type
    let t = dep.split('.').slice(-1)[0];
    switch(t){
      case 'js':
        
        let js = document.createElement("script");
        js.setAttribute("src", "/assets/js/controls/"+dep);
        js.id = dep;
        js.onload = js.onreadystatechange = function() {
 
          if(!this.readyState || this.readyState == 'complete')
            if(typeof cb === 'function') cb.call();
        };
        document.body.appendChild(js);
        
      break;
      case 'css':

        var head  = document.getElementsByTagName('head')[0];
        var css  = document.createElement('link');
        css.id   = dep;
        css.rel  = 'stylesheet';
        css.type = 'text/css';
        css.href = '/assets/js/controls/'+dep;
        head.appendChild(css);

      break;
    }
    
    return true;
  },

  /**
   * Simulate a click event.
   * @public
   * @param {Element} elem the element to simulate a click on
   */
  triggerClick : function (el) {
    // Create our event (with options)
    let evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    // If cancelled, don't dispatch our event
    let canceled = !el.dispatchEvent(evt);
  }
}