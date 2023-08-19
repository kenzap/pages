import { __html, __attr } from '@kenzap/k-cloud';

// html product list loader
export const EditSettings = (_this) => {

return `
    <div class="card border-white shadow-sm lay br mb-2 nodrag">
        <div class="card-header border-white bg-white" role="tab" id="section0">
            <h6 class="my-2 d-flex align-items-center justify-content-between">
                <a data-bs-toggle="collapse" href="#collapses-settings" data-section="s" aria-expanded="false" aria-controls="collapses" class="secos collapsed text-dark text-decoration-none fs-4">
                    ${ __html('Page Settings') }<div id="page_template"></div>
                </a>
            </h6>
        </div>
        <div id="collapses-settings" class="collapse" role="tabpanel" aria-labelledby="collapses-settings" data-parent="#sections" >
            <div class="card-body">
                <div class="controls">
                    <div class="r row">
                        <div class="col-md-12">
                            <div class="form-group row"> 
                                <label class="col-sm-6 col-form-label">${ __html('Title') }</label>
                                <div class="col-sm-12"> 
                                    <input id="ptitle" type="text" data-key="heading" data-type="text" class="text-input form-control inps" value="${ _this.page.title ? _this.page.title : '' }" name="ptitle">
                                    <p class="form-text mt-2">${ __html('Page title is used by the search engines and when you share the page.') }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r row">
                        <div class="col-md-12">
                            <div class="form-group row"> 
                                <label class="col-sm-6 col-form-label">${ __html('Slug') }</label>
                                <div class="col-sm-12"> 
                                    <input id="pslug" type="text" data-key="heading" data-type="text" class="text-input form-control inps" value="${ _this.page.slug ? _this.page.slug : '' }" name="pslug">
                                    <p class="form-text mt-2">${ __html('Page address or unique url.') }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r row"> 
                        <div class="col-md-12">
                            <div class="form-group row"> 
                                <label class="col-sm-6 col-form-label">${ __html('Description') }</label>
                                <div class="col-sm-12"> 
                                    <textarea id="pdesc" type="text" data-key="info1_desc" data-type="text" class="text-input form-control inps" value="" name="pdesc" rows="4">${ _this.page.description ? _this.page.description : '' }</textarea>
                                    <p class="form-text mt-2">${ __html('Used by search engines and when you share the page.') }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r row"> 
                        <div class="col-md-12">
                            <div class="form-group row"> 
                                <label class="col-sm-6 col-form-label">${ __html('Palette') }</label>
                                <div class="col-sm-12"> 
                                    <ul id="palette" class="palette inp" data-type="palette">
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="baseColorA" value="#1941df" style="width:50px" title="Choose your base color"> </li>
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="baseColorB" value="#1941df" style="width:50px" title="Choose your base color"> </li>
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="bgColorA" value="#000000" style="width:50px" title="Main background color"> </li>
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="bgColorB" value="#494949" style="width:50px" title="Light background color"> </li>
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="txtColorA" value="#111111" style="width:50px" title="Secondary text color"> </li>
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="txtColorB" value="#818181" style="width:50px" title="Light text color"> </li>
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="txtColorC" value="#ffffff" style="width:50px" title="Main text color"> </li>
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="grayColorA" value="#F7F7F7" style="width:50px" title="Secondary text color"> </li>
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="grayColorB" value="#c0c0c0" style="width:50px" title="Light text color"> </li>
                                        <li> <input type="color" class="border border-secondary form-control form-control-color" data-key="grayColorB" value="#818181" style="width:50px" title="Main text color"> </li>
                                    </ul> 
                                    <div class="clearfix"></div>
                                    <p class="form-text">${ __html('Click on block above to pick custom color') }</p>
                                </div>
                            </div>
                        </div>
                    </div>     
                    <div class="r row">
                        <div class="col-md-12">
                            <div class="form-group row"> 
                                <label class="col-sm-12 col-form-label">${ __html('Heading font') }</label>
                                <div class="col-sm-6"> 
                                    <select id="font_heading" class="font-input text-input form-control form-select" >\
                                        
                                    </select>
                                    <p class="form-text mt-2"></p>
                                </div>
                                <div class="col-sm-3"> 
                                    <select id="font_heading_type" class="font-input text-input form-control form-select" >\
                                        <option value="sans-serif">Sans Serif</option>
                                        <option value="serif">Serif</option>
                                        <option value="monospace">Monospace</option>
                                    </select>
                                    <!-- <input id="heading_type" type="text" data-type="text" class="text-input form-control inps" value="" name="heading_type"> -->
                                    <p class="form-text mt-2"></p>
                                </div>
                                <div class="col-sm-3"> 
                                    <select id="font_heading_weight" class="font-input text-input form-control form-select" >\
                                        <option value="100" class="d-none"></option>
                                        <option value="200">${ __html('Light') }</option>
                                        <option value="300" class="d-none">300</option>
                                        <option value="400" selected>${ __html('Normal') }</option>
                                        <option value="500" class="d-none">500</option>
                                        <option value="600">${ __html('Bold') }</option>
                                        <option value="700" class="d-none">700</option>
                                        <option value="800" class="d-none">800</option>
                                    </select>
                                    <!-- <input id="heading_weight" type="text" data-type="text" class="text-input form-control inps" value="" name="heading_weight"> -->
                                    <p class="form-text mt-2"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r row">
                        <div class="col-md-12">
                            <div class="form-group row"> 
                                <label class="col-sm-12 col-form-label">${ __html('Body font') }</label>
                                <div class="col-sm-6"> 
                                <select id="font_body" class="font-input text-input form-control form-select" >\
                                    
                                </select>
                                <p class="form-text mt-2"></p>
                                </div>
                                <div class="col-sm-3"> 
                                <select id="font_body_type" class="font-input text-input form-control form-select" >\
                                    <option value="sans-serif">Sans Serif</option>
                                    <option value="serif">Serif</option>
                                    <option value="monospace">Monospace</option>
                                </select>
                                <p class="form-text mt-2"></p>
                                </div>
                                <div class="col-sm-3"> 
                                <select id="font_body_weight" class="font-input text-input form-control form-select" >\
                                    <option value="100" class="d-none">${ __html('Very Light') }</option>
                                    <option value="200">${ __html('Light') }</option>
                                    <option value="300" class="d-none">300</option>
                                    <option value="400" selected>${ __html('Normal') }</option>
                                    <option value="500" class="d-none">500</option>
                                    <option value="600">${ __html('Bold') }</option>
                                    <option value="700" class="d-none">700</option>
                                    <option value="800" class="d-none">800</option>
                                </select>
                                <p class="form-text mt-2"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r row access-cont ">
                        <div class="col-md-12">
                            <div class="form-group row"> 
                                <label class="col-sm-12 col-form-label d-none">${ __html('Restrict access') }</label>
                                <div class="col-sm-12">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="password_protect" ${ _this.page.password_protect ? 'checked' : '' } >
                                        <label class="form-check-label" for="password_protect">${ __html('Restrict access') }</label>
                                    </div>
                                    <p class="form-text mt-2 d-none">${ __html('Set this page as home page.') }</p>
                                </div>
                                <div class="col-sm-6 mt-2 password-cont ${ _this.page.password_protect ? '' : 'd-none' }"> 
                                    <label class="col-form-label d-none" for="password">${ __html('Restrict access') }</label>
                                    <input id="password" type="password" data-key="password" data-type="text" class="text-input form-control inps" value="${ _this.page.password ? _this.page.password : '' }" name="password">
                                </div>
                                <p class="form-text mt-2">${ __html('Password-protect page, password should be at least 4 characters long.') }</p>
                            </div>
                        </div>
                    </div>                   
                    <div class="r row homepage-cont ${ _this.page.password_protect ? 'd-none' : '' }">
                        <div class="col-md-12">
                            <div class="form-group row"> 
                                <label class="col-sm-6 col-form-label d-none">${ __html('Homepage') }</label>
                                <div class="col-sm-12">
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" id="home_page" ${ _this.page.home_page ? 'checked' : '' } >
                                        <label class="form-check-label" for="home_page">${ __html('Homepage') }</label>
                                    </div>
                                    <p class="form-text mt-2">${ __html('Set this page as home page.') }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r row">
                        <div class="col-md-12">
                            <div class="form-group row"> 
                                <label class="col-sm-6 col-form-label">${ __html('CSS Rules') }</label>
                                <div class="col-sm-12">
                                    <textarea id="css_rules" data-key="css_rules" data-type="text" class="csseditor-input text-input form-control inps" name="css_rules">${ _this.page.css_rules ? _this.page.css_rules : '' }</textarea>
                                    <p class="form-text mt-2">${ __html('Add custom CSS rules to adjust visual look of the page.') }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
}