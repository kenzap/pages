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
  obj : { settingsCache:null },

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
      case 'single': this.initSingle(sel, js, cb); break;

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
  * @return 	{HTML} 	    output    HTML element 
  * 
  */
  initSingle : function(sel, js, cb) {

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
    if(document.querySelector(sel)) document.querySelector(sel).innerHTML = html;

    // assign listeners
    this.listeners();
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

    let _this = this;

    // cache data locally
    this.page = js;

    // save globally
    this.cb = cb;

    // no sections founds
    if(js.sections == undefined) return "";

    // output html sections
    let html = "";

    // iterate sections
    let i = 0;
    for(sec in js.sections){

      let s = js.sections[sec];

      html+='\
      <div class="card border-white shadow-sm lay br">\
        <div class="card-header border-white bg-white" role="tab" id="section'+i+'">\
          <h6 class="mb-0 d-flex align-items-center justify-content-between">\
            <a data-bs-toggle="collapse" href="#collapse'+i+'" data-section="'+i+'" aria-expanded="false" aria-controls="collapse'+i+'" class="seco collapsed text-dark">\
              '+s.data.title+'\
              <div class="tname text-secondary">'+s.data.template+' template</div>\
            </a>\
            <div class="row-actions-card">\
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor"data-acc="actions" data-section="'+i+'" class="bi bi-three-dots-vertical text-dark acc acc2 contect" viewBox="0 0 16 16">\
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\
              </svg>\
              <i title="Actions" data-acc="actions" data-section="'+i+'" class="mdi mdi-dots-vertical acc acc2 contect d-none" ></i>\
            </div>\
          </h6>\
        </div>\
        <div id="collapse'+i+'" class="collapse" role="tabpanel" aria-labelledby="section'+i+'" data-parent="#sections" style="">\
          <div class="card-body">\
              <div class="controls" data-section="'+i+'"></div>\
          </div>\
        </div>\
      </div>';
      i++;
    }

    // output render to passed html selector
    if(document.querySelector(sel)) document.querySelector(sel + ' > button').insertAdjacentHTML("beforeBegin", html);

    // assign listeners
    let el = document.querySelectorAll(".seco");
    for (const a of el) {
      a.addEventListener('click', function(e) {

        _this.initSingle("#collapse"+this.dataset.section+" .controls", js.sections[this.dataset.section].data, _this.cb);
        return false;
      })
    }

    // init section listeners
    this.sectionListeners(".acc2");
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
    console.log(js);

    // save globally
    this.cb = cb;

    // no sections founds
    if(js == undefined) return "";

    // output html sections
    let html = "";

    // iterate sections
    // let i = 0;
    for(sec in js){

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

        // console.log(this.dataset.section);
        // console.log(_this.settings[this.dataset.section].data);

        _this.initSingle("#collapse"+this.dataset.section+" .controls", _this.settings[this.dataset.section].data, _this.cb);
        return false;
      })
    }

    // init section listeners
    this.sectionListeners(".acc2");
  },

  /*
  * row item click listeners
  * 
  */
  rowitemClickList : function(){

    let _this = this._this;
    let a = this.a;
    
    a.parentElement.parentElement.dataset.block = true;
    setTimeout(function(){ a.parentElement.parentElement.dataset.block = false; },300);

    let key = a.parentElement.parentElement.parentElement.dataset.key;
    let section = a.closest('.controls').dataset.section;
    let k;
    switch(a.dataset.acc){

      // copy row
      case 'copy':

        const ccb = function() {

          let rc = a.closest(".row-cont");
          k = rc.dataset.key.split('.');
          let cObj = {};
          switch(k.length){

            case 2: cObj = JSON.parse(JSON.stringify(_this.data[k[0]][k[1]])); _this.updateIDs(cObj); _this.data[k[0]].push(cObj);  break;
            case 3: cObj = JSON.parse(JSON.stringify(_this.data[k[0]][k[1]][k[2]])); _this.updateIDs(cObj); _this.data[k[0]][k[1]].push(cObj); break;
            default: return false;
          }

          // rerender html
          _this.initSingle("#collapse"+section+" .controls", _this.data, _this.cb);

          // notify frontend
          _this.obj.action = 'copy';
          _this.obj.source = 'rowitem';
          _this.cb.call({action:'copy', source:'rowitem'});
        }
        ccb.call();
      break;
      case 'remove': 
        const rcb = function() {
          
          a.parentElement.parentElement.parentElement.remove();

          // remove element from global data object
          k = key.split('.');
          switch(k.length){

            case 2: _this.data[k[0]].splice([k[1]], 1); break;
            case 3: _this.data[k[0]][k[1]].splice([k[2]], 1); break;
            case 4: _this.data[k[0]][k[1]][k[2]].splice([k[3]], 1); break;

            default: return false;
          }

          // notify frontend
          _this.obj.action = 'remove';
          _this.obj.source = 'rowitem';
          _this.cb.call({action:'remove', source:'rowitem'});
        }
        ask('warning','Warning','Remove permanently?','Remove', rcb);
      break;
    }
  },

  /*
  * section click listeners
  * 
  */
  sectionClickList : function(e){

    e.preventDefault();
    // close old modules
    // $('.modal.show').modal('hide');
    
    let modal = document.querySelector(".modal");
    let modalCont = new bootstrap.Modal(modal);

    modal.querySelector(".modal-dialog").style.maxWidth = '500px';
    modalCont.hide();

    let _this = this._this;
    let a = this.a;

    // let _this = e.currentTarget;
    // let section = _this.dataset.section;
    let section = a.dataset.section;
    console.log('section: ' + section);
    // alert("click"+a.dataset.acc);
    switch(a.dataset.acc){

      // actions modal
      case 'actions':

        let html = '\
            <nav id="context-menu" class="context-menu">\
              <ul class="context-menu__items">\
                <li class="context-menu__item">\
                  <a href="#" class="context-menu__link text-dark acc" data-acc="moveup" data-section="'+section+'">\
                    Move Up <i class="mdi mdi-arrow-up"></i> \
                  </a>\
                </li>\
                <li class="context-menu__item">\
                  <a href="#" class="context-menu__link text-dark acc" data-acc="movedown" data-section="'+section+'">\
                    Move Down <i class="mdi mdi-arrow-down"></i> \
                  </a>\
                </li>\
                <li class="context-menu__item">\
                  <a href="#" class="context-menu__link text-dark acc" data-acc="copy" data-section="'+section+'">\
                    Duplicate <i class="mdi mdi-content-duplicate"></i> \
                  </a>\
                </li>\
                <li class="context-menu__item">\
                  <a href="#" class="context-menu__link text-dark acc" data-acc="settings" data-section="'+section+'">\
                    Advanced <i class="mdi mdi-brush"></i> \
                  </a>\
                </li>\
                <li class="context-menu__item">\
                  <a href="#" class="context-menu__link text-dark acc" data-acc="remove" data-section="'+section+'">\
                    Delete <i class="mdi mdi-trash-can-outline "></i> \
                  </a>\
                </li>\
              </ul>\
            </nav>';

        $("#settings").find(".modal-title").html("");
        // $("#settings .mloader").fadeIn("fast");
        $("#settings").attr('data-section',section);
        $("#settings").attr('data-source','settings');
        $("#settings").attr('data-acc','actions');
        $("#settings").attr('data-acc','actions');
        // $("#settings .layouts_body").html(html);
        modal.querySelector(".modal-title").innerHTML = _this.page.sections[section].data.title;
        modal.querySelector(".modal-body").innerHTML = html;
        modal.querySelector(".btn-primary").style.display = 'none';
        modal.querySelector(".btn-secondary").innerHTML = 'Cancel';

        // $("#settings").modal("show");
        
        modalCont.show();

        setTimeout(function(){

          _this.sectionListeners(".acc"); 
          $("#settings .acc").attr('data-section',section); 
          $(".modal.show").find(".modal-title").html(_this.page.sections[section].data.title); 
        }, 500);

      break;
      // move layout up
      case 'moveup': 

        console.log("moveup: "+section);

        // move layout section up
        _this.arrayMove(_this.page.sections, section, section-1);

        // reassign listeners
        _this.sectionListeners(".acc2");

        // notify frontend
        _this.obj.action = 'section-moveup';
        _this.cb.call({action:'section-moveup'});
        
      break;
      // move layout down
      case 'movedown': 

        // move layout section up
        _this.arrayMove(_this.page.sections, section, section+1);

        // reassign listeners
        _this.sectionListeners(".acc2");

        // notify frontend
        _this.obj.action = 'section-movedown';
        _this.cb.call({action:'section-movedown'});

      break;
      // layout container settings
      case 'settings':

        // need delay to hide previous
        setTimeout(function(){
          
          $("#settings").attr('data-section',section);
          $("#settings").attr('data-source','settings');
          $("#settings").attr('data-acc','settings');
          $("#settings .layouts_body").html('');
          // $("#settings").modal("show");

          // get settings structure
          if( !Controls.obj.settingsCache ){

            $.get("https://site.kenzap.cloud/js/controls/settings.html", {

              // token: getCookie('kenzap_token')
            }, function (data, status) {
              
              settingsCache = data;
              Controls.renderSettings(settingsCache, section);
            });
            
            return;
          }

          Controls.renderSettings(settingsCache, section);

        },  500);
          
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
      
      break;
      // remove layout
      case 'remove': 

        if(!confirm('Remove this section?')) return;

        modalCont.hide();

        _this.triggerClick(document.querySelector('.btn-close'));

        _this.page.sections.splice(section, 1); 

        // notify frontend
        _this.obj.action = 'section-remove';
        _this.cb.call({action:'section-remove'});

        // const cb = function() {
          
        //   // a.parentElement.parentElement.parentElement.remove();
        //   _this.page.sections.splice(section, 1); 

        //   // notify frontend
        //   _this.cb.call({action:'section-remove'});
        // }

        // ask('warning','Warning','Completely remove this section?','Remove',cb);

      break;
    }
  },

  // render builder settings
  renderSettings: (html, section) => {

    let modal = document.querySelector(".modal");
    let modalCont = new bootstrap.Modal(modal);
    
    modal.querySelector(".modal-body").innerHTML = html;
    modal.querySelector(".modal-dialog").style.maxWidth = '700px';
    // $(".mloader").fadeOut("fast");
    // $(".modal.show").find(".layouts_body").html(html);

    let c = Controls.page.sections[section].data.c;
    if(!c) c = {};

    // parse sections
    if(c.section) c.section.split(';').forEach(string => { const [key, value] = string.split(":");
      switch(key){
        case 'background-color': $(".modal.show").find("#bg-color").val(value); break;
        case 'bg-image': $(".modal.show").find("#bg-image").val(value); break;
      }
    });

    // parse container
    if(c.container) c.container.split(';').forEach(string => { const [key, value] = string.split(":");
      switch(key){
        case 'max-width': $(".modal.show").find("#max-width").val(value.match( /\d+/g ).join('')); break;
        case 'padding-left': $(".modal.show").find("#side-paddings").val(value.match( /\d+/g ).join('')); break;
      }
    });

    // parse classes
    if(c.classes) c.classes.split(' ').forEach(string => { 

      console.log("class "+string);
      switch(string){
        case "pd0": $("#pd0").prop("checked", true); break;
        case "pds": $("#pds").prop("checked", true); break;
        case "pdm": $("#pdm").prop("checked", true); break;
        case "pdl": $("#pdl").prop("checked", true); break;
      }
    });

    Controls.applySettings();
  },

  // layouts setting apply click listener
  applySettings: () => {

    $(".btn-apply-set").off();
    $(".btn-apply-set").click(function(){

      let section = parseInt($(".modal.show").attr("data-section"));

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
      _this.cb.call();

      console.log(Controls.page.sections[section].data.c);
    });
  },
  /*
  * Change element position in the array.
  * Used by move up move down actions
  * 
  */
  arrayMove : function(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
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
        a.addEventListener('click', _this.sectionClickList.bind(args));
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

    // test data
    // js.item = [{"title":"hahaha","input":"text","val":"hahaha"},{"test":{"input":"lll"}}];
    // js.title.subtitle = {"test":"hahaha","input":"hahaha"};
    let output = outputF = "";
    this.iterate(js, function(o){ if(o) output += o; });

    // group elements, such as rows or tabs
    var wrapper = document.createElement('div');
    wrapper.innerHTML = output;
    let rows = wrapper.querySelectorAll(".r.row");
    let lastRow = '';
    let rowOpen = false;

    // <i title="Drag me" class="mdi mdi-drag-vertical menu-icon drag-item"></i>\
    let actions = '\
      <div class="row-actions">\
        <i title="Duplicate" data-acc="copy" class="mdi mdi-content-duplicate duplicate-item rowacc"></i>\
        <i title="Remove" data-acc="remove" class="mdi mdi-trash-can-outline remove-item rowacc"></i>\
      </div>';

    for (const row of rows){

        // skip rows outside top hierarchy 
        if(row.dataset.key == undefined) continue;

        if(lastRow!=row.dataset.key){ 

          // input does not belong to a row
          if(row.dataset.key!=''){

            let keyArr = row.dataset.key.split(".");
            let keyTitle = keyArr[0];
            let keyIndex = parseInt(keyArr[1]);
            if(Number.isInteger(keyIndex)) keyIndex += 1;
            keyTitle = keyTitle[0].toUpperCase() + keyTitle.slice(1).toLowerCase()+" #"+keyIndex;
            if(rowOpen){ outputF += '</div><div class="row-cont" data-key="'+row.dataset.key+'"><div class="row-click"><b>'+keyTitle+'</b>'+actions+'</div>'; }else{ outputF += '<div class="row-cont" data-key="'+row.dataset.key+'"><div class="row-click"><b>'+keyTitle+'</b>'+actions+'</div>'; rowOpen = true; }
          
          // independent input control
          }else{

            if(rowOpen){ outputF += '<br></div>' } else{  }
            rowOpen = false; 
          }

          lastRow=row.dataset.key; 
        }
        outputF += row.outerHTML;
    }
    if(rowOpen) outputF += '<br></div>';

    // console.log(outputF);
    // console.log(this.data);
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
  // timer: null,
  setJSV : function(v, k, e) {

    let _this = this;  

    console.log("setJSV "+k+" - "+v);

    // get current section
    let c = document.querySelector("#"+e.id).closest('.controls')
    _this.sec = c.dataset.section; 

    // let c = _this.findParentNode(e, ".controls");
    console.log(c.dataset.section);

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
      case 'icon':

        // listener
        this.l.text = function(){

          let input = document.querySelectorAll(".text-input");
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

          let input = document.querySelectorAll(".textarea-input");
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
            $('.range-input').each( function( i, elem ) {

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
        }

        // set defaults
        js.min = js.min == undefined ? 0 : js.min;
        js.max = js.max == undefined ? 100 : js.max;
        value == "" ? (js.min + js.max) / 2 : value;

        // if(typeof(js.min)=="undefined") console.log("");
        console.log(js.min);
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

          let input = document.querySelectorAll(".radio-input");
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

          let input = document.querySelectorAll(".font-input");
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
  
            console.log("pre Quill");

            // callback after dependencies loaded
            let cbf = function cbf() {

              $('.richtext-input').each( function( i, elem ) {

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

                  let _cb = quill.container.parentElement.querySelector(".richtext-input");
                  
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
    
              let input = document.querySelectorAll(".switch_label");
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
            $('.color-input').each( function( i, elem ) {

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
          
      case 'image': 

          js.sizes = js.sizes == undefined ? ["600","1200x500"] : js.sizes;
          let sizestxt = ""; js.sizes.forEach(function(entry) { sizestxt+=entry+'|'; }); sizestxt = sizestxt.substr(0, sizestxt.length-1);

          console.log(sizestxt);
          // listeners
          this.l.image = function(){

            // image click listener
            let ip = document.querySelectorAll(".image-preview");
            for (const a of ip) {
              a.addEventListener('click', function(e) {
  
                console.log(this.dataset.id);

                let inp = document.querySelector("#u_"+this.dataset.id); //.closest('.controls')
                _this.triggerClick(inp);

                // _this.setJSV(this.value, this.dataset.key, this);
                return false;
              });
            }

            // image upload callback
            let iu = function(iid, file){

              let fd = new FormData();
              let sizes = document.querySelector("#"+iid).dataset.sizes;

              fd.append('file',file);
              fd.append('id',_this.getId());
              fd.append('iid',iid);
              fd.append('cmd','upload_image');
              fd.append('sizes',sizes);
              fd.append('type','editor');
              fd.append('token',getCookie('kenzap_token'));
      
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
                url: 'https://siteapi.kenzap.cloud/v1/',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response){
          
                  var js = JSON.parse(response);
                  if(js.success){

                    // update values
                    let _icb = document.querySelector("#"+iid);
                    let icbv = '/images/'+iid+'-'+sizes.split('|')[0]+'.jpeg';
                    // console.log(iid+" "+icbv);
                    _this.setJSV(icbv, _icb.dataset.key, _icb);
                  }
                },
              });
            }

            // image preview listener
            let iup = document.querySelectorAll(".image-upload");
            for (const a of iup) {
              a.addEventListener('change', function(e) {

                console.log("image-upload preview");
                if (this.files && this.files[0]) {
            
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
            src = ((value.length<5)?'https://kenzap.com/account/images/placeholder.jpg':'https://preview.kenzap.cloud/S'+_this.getId()+'/_site'+value.replace('../','/'))
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
              $('.csseditor-input').each( function( i, elem ) {

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
    let el = document.querySelectorAll(".row-click");
    for (const a of el) {
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
      },10);
    }

    // row actions | copy remove listener
    let rowacc = document.querySelectorAll(".rowacc");
    for (const a of rowacc) {
      
      let args = { _this: _this, a: a };
      if (!a.dataset.rid){

        // assign ids to copy/remove buttons to prevent double assignments
        a.dataset.rid = _this.makeid(6);
        // a.addEventListener('click', function(e){ e.preventDefault(); return false; });
        a.addEventListener('click', _this.rowitemClickList.bind(args, this));
      }
    }
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
        js.setAttribute("src", "https://site.kenzap.cloud/js/controls/"+dep);
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
        css.href = 'https://site.kenzap.cloud/js/controls/'+dep;
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