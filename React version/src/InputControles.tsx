import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

const InputControles: React.FC<{ selectedValue: "mkg" | "ftlbs"; onUnitChange: (value: "mkg" | "ftlbs") => void }> = (props) => {
  const handleSegmentChange = (value: "mkg" | "ftlbs") => {
    props.onUnitChange(value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={(e) => handleSegmentChange(e.detail.value as "mkg" | "ftlbs")}>
      <IonSegmentButton value={"mkg"}>
        <IonLabel>m/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value={"ftlbs"}>
        <IonLabel>ft/lb</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControles;
