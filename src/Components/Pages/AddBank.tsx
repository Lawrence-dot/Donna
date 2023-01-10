export const AddBank = `
<div class="addbank mt-2 mx-3">
  <div class="flex flex-col text-sm">
    <input type="text" placeholder="Bank Name" id="type">
    <input id="name" type="text" placeholder="Account Name" />
    <input id="number" type="text" placeholder="Account Number" />  
    <button id="custom" class="border py-1 mt-2 mb-2 text-sm rounded-md hover:bg-blue-900 hover:text-white border-blue-900 text-black"> Submit </button>
  </div>
</div>
`;

export function addbank() {
  const data = {
    name: (document.getElementById("name") as HTMLInputElement)!.value,
    number: Number(
      (document.getElementById("number") as HTMLInputElement)!.value
    ),
    type: (document.getElementById("type") as HTMLInputElement)!.value,
  };
  console.log(data);
}
