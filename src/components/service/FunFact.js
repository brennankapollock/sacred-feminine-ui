const funFacts = [
  { id: 1, value: '25', name: 'Retreats Hosted' },
  { id: 2, value: '3K', name: 'Happy Clients' },
  { id: 3, value: '9K+', name: 'Lines of Code' },
];

const FunFact = () => {
  return (
    <div className="tokyo_tm_facts w-full h-auto clear-both float-left px-0 pt-[100px] pb-[60px]">
      <div className="container">
        <div className="tokyo_section_title w-full h-auto clear-both float-left mb-[40px]">
          <h3 className="text-[20px] font-bold">Fun Facts</h3>
        </div>
        <div className="list w-full h-auto clear-both float-left">
          <ul className="ml-[-40px] list-none">
            {funFacts.map((item) => (
              <li
                className="mb-[40px] pl-[40px] w-1/3 float-left"
                key={item.id}
              >
                <div className="list_inner  w-full h-auto clear-both float-left relative border-solid border-[rgba(0,0,0,.1)] border text-center px-[20px] py-[40px]">
                  <h3 className="font-semibold text-[20px] mb-[3px]">
                    {item.value}
                  </h3>
                  <span>{item.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default FunFact;
