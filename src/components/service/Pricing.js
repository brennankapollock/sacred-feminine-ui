const Pricing = () => {
  return (
    <div className="tokyo_tm_pricing w-full h-auto clear-both float-left px-[0px]  pb-[60px] bg-white">
      <div className="container">
        <div className="tokyo_section_title w-full h-auto clear-both float-left mb-[40px]">
          <h3 className="text-[40px] font-bold font-psych">Cost</h3>
        </div>
        <div className="list w-full h-auto clear-both float-left">
          <ul className="ml-[-40px]">
            <li className="mb-[40px] pl-[40px] w-1/3 float-left">
              <div className="list_inner w-full h-auto clear-both float-left relative border-solid border-[rgba(0,0,0,.1)] border px-[40px] pt-[27px] pb-[45px]">
                <div className="price w-full float-left">
                  <h3 className="text-[40px] font-semibold">
                    <span>
                      1100<span className="currency">$</span>
                    </span>
                  </h3>
                </div>
                <div className="plan w-full float-left"></div>
                <ul className="item list-none">
                  <li className="active font-montserrat">
                    <p>
                      Please let us know if making a single payment is an
                      obstacle for you as we also have scholarships available.
                    </p>
                  </li>
                </ul>
                <div className="tokyo_tm_button" data-position="left">
                  <a href="#">
                    <span>Purchase</span>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Pricing;
