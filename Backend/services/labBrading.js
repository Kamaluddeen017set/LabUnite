export function labBranding(lab) {
  return {
    logo:
      lab.logoUrl ||
      "https://res.cloudinary.com/dg1zkgl6n/image/upload/v1764238226/laboratory-logo-sample-removebg-preview_pxlz1x.png",
    name: lab.name,
    address: lab.address,
    phone: lab.phone,
    email: lab.email,
    color: lab.color || "#01578b",
    softwareLogo:
      "https://res.cloudinary.com/dg1zkgl6n/image/upload/v1764237836/LabUniteLogo_jnapqw.png",
  };
}
