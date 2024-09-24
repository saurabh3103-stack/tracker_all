import React from "react"
function Dashboard() {  
    return (
      <>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xxl-3 col-sm-3 col-12">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="p-3">
                      <i class="icon-user fs-1 lh-1 text-primary"></i>
                    </div>
                    <div class="py-3">
                      <h5 class="text-secondary fw-light">Total Vehicle</h5>
                      <h1 class="m-0">0</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
            <div class="col-xxl-3 col-sm-3 col-12">
              <div class="card mb-4">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="p-3">
                      <i class="icon-qr_code fs-1 lh-1 text-primary"></i>
                    </div>
                    <div class="py-3">
                      <h5 class="text-secondary fw-light">Assign QR Vehicle</h5>
                      <h1 className="m-0">0</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
            <div class="col-xxl-3 col-sm-3 col-12">  
              <div class="card mb-4">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="p-3">
                      <i class="icon-add_road fs-1 lh-1 text-primary"></i>
                    </div>
                    <div class="py-3">
                      <h5 class="text-secondary fw-light">Total Routes</h5>
                      <h1 class="m-0">0</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
            {/* <div class="col-xxl-3 col-sm-3 col-12">  
              <div class="card mb-4">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="p-3">
                      <i class="icon-twitch fs-1 lh-1 text-danger"></i>
                    </div>
                    <div class="py-3">
                      <h5 class="text-secondary fw-light">Reviews</h5>
                      <h1 class="m-0 text-danger">98%</h1>
                    </div>
                    <span class="badge bg-danger-light position-absolute top-0 end-0 m-3"><i class="icon-trending-down me-1"></i>9%</span>
                  </div>
                </div>
              </div>
            </div>   */}
          </div>
        </div>
      </>
    )
  }
  export default Dashboard