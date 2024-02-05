import Visions, { loader as visionsloader } from "../_dashboard.visions/route";

export let loader = visionsloader;

export default function IndividualVisions() {
  return <Visions />;
}
