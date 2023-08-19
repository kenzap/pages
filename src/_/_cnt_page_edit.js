import { __html, __attr } from '@kenzap/k-cloud';

// html product list loader
export const HTMLContent = () => {

return `
  <div class="container p-edit">
    <div class="d-md-flex justify-content-between bd-highlight mb-3">
        <nav class="bc" aria-label="breadcrumb"></nav>
        <div>
            <a class="preview-link nounderline d-md-inline-block d-none me-3" target="_blank" href="#">${ __html('open page') }<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/></svg></a>
            <button class="btn btn-primary btn-publish mt-3 mb-1 mt-md-0 mb-md-0" type="button">${ __html('Save Changes') }</button>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">
            <div class="accordion accordion-solid-header sections" id="sections" role="tablist" style="width:100%;">

                <div class="add-card add-layout border-white p-sm-2 anm br mt-3" data-ext="">
                    <div class="card-body">
                        <div class="d-flex flex-row justify-content-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" style="color:#ccc;" class="bi bi-plus-circle justify-content-center p-3" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                            </svg>
                        </div>                  
                    </div>
                </div>

            </div>
        </div>
        <div class="col-lg-6 mt-3 mt-lg-0 grid-margin grid-margin-lg-0 grid-margin-md-0">

            <div class="row">
                <div class="col-12 grid-margin stretch-card">
                
                    <iframe class="preview card border-white shadow-sm br iload" style="width:100%;border:none;border-radius:4px;" ></iframe>

                    <div class="card border-white shadow-sm p-sm-3 d-none">
                        <div class="card-body">
     
                            <h4 class="card-title" style="display:none;">${ __html('General') }</h4>
                            <div class="landing_status"></div>
                            <input type="hidden" class="form-control" id="landing-slug" value="">

                            <h4 id="elan" class="card-title mb-4">${ __html('Status') }</h4>
                            <div id="status-cont" class="mb-3">

                                <div class="col-sm-12">
                                    <div class="form-check">
                                        <label class="form-check-label status-publish form-label">
                                            <input type="radio" class="form-check-input" name="p-status"
                                                id="p-status1" value="1">
                                                ${ __html('Published') }
                                        </label>
                                    </div>
                                </div>

                                <div class="col-sm-12">
                                    <div class="form-check">
                                        <label class="form-check-label status-draft form-label">
                                            <input type="radio" class="form-check-input" name="p-status"  id="p-status0" value="0">
                                            ${ __html('Draft') }
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <h4 id="elan" class="card-title mb-4">${ __html('Categories') }</h4>
                            <div id="p-cats" class="simple-tags mb-4" data-simple-tags=""></div>
                            <div class="clearfix"> </div>

                            <div class="d-grid gap-2">
                                <button class="btn btn-primary btn-save" type="button">${ __html('Save') }</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </div>

  <div class="modal p-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-modal"></button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>
            </div>
        </div>
    </div>
  </div>

  <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">
    <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"
        aria-atomic="true" data-bs-delay="3000">
        <div class="d-flex">
            <div class="toast-body"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
  </div>
  `;
}