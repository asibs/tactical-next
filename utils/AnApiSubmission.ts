const submitANForm = async (
  email: string,
  postcode: string,
  constituency: Constituency,
  anFormUrl: string,
  sourceCode: string = "",
): Promise<Response> => {
  if (!email || !anFormUrl) {
    return Response.error();
  }

  // hack to get around AN constituency name problems
  const an_name_map: { [index: string]: string } = {
    "Ynys Môn": "Ynys Mon",
    "Montgomeryshire and Glyndŵr": "Montgomeryshire and Glyndwr",
  };

  const an_constituency_name: string =
    an_name_map[constituency.name] || constituency.name;

  const requestJson = {
    person: {
      postal_addresses: [
        {
          postal_code: postcode,
          country: "GB",
        },
      ],
      email_addresses: [
        {
          address: email,
          status: "subscribed",
        },
      ],
      custom_fields: {
        constituency_2024: an_constituency_name,
        constituency_slug: constituency.slug,
      },
    },
    triggers: {
      autoresponse: {
        enabled: true,
      },
    },
    "action_network:referrer_data": {
      source: sourceCode,
      website: "https://stopthetories.vote",
    },
  };

  return fetch(new URL(anFormUrl || ""), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestJson),
  });
};

export { submitANForm };
