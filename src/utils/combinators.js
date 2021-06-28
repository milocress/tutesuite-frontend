export const handle_change = (thisThing) => (e) => {
  thisThing.setState({
    [e.target.name]: e.target.value
  });
}

export const create_room_name = (request_pid) => {
  const hash = "030F-95139B24F-D7846C058AEA"
  return hash + '-' + JSON.stringify(request_pid)
}

export const create_room_link = (url, request_pid) => {
  return url + '/' + create_room_name(request_pid)
}