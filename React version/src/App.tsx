
import { IonApp, setupIonicReact, IonHeader, IonContent, IonToolbar, IonRow, IonGrid, IonCol, IonButton, IonIcon, IonItem, IonInput, IonLabel, IonTitle, IonMenu, IonAvatar, IonList, IonMenuToggle, IonAlert } from '@ionic/react';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */

import { calculatorOutline, menuOutline, refreshOutline } from 'ionicons/icons';


setupIonicReact();

import React, { useState } from 'react';
import Logo from "./assets/Logo.jpg"
import './index.css'; // Adjust the path if necessary
import { toast } from 'react-hot-toast'; // Import this at the top of your file
import InputControles from './InputControles';

setupIonicReact();

const App: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmiValue, setBmiValue] = useState<number | null>(null);
  const [bmiMessage, setBmiMessage] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<'mkg' | 'ftlbs'>('mkg'); // State for selected unit

  const calculateBMI = () => {
    let heightInMeters: number;
    let weightInKg: number;

    if (selectedUnit === 'mkg') {
        heightInMeters = parseFloat(height) / 100; // Convert cm to meters
        weightInKg = parseFloat(weight);
    } else {
        heightInMeters = parseFloat(height) * 0.3048; // Convert feet to meters
        weightInKg = parseFloat(weight) * 0.453592; // Convert lbs to kg
    }

    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
        toast.error("Enter valid height and weight");
        setBmiValue(null);
        setBmiMessage('');
        return;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setBmiValue(parseFloat(bmi.toFixed(2)));

    if (bmi < 18.5) {
        setBmiMessage('Underweight');
        toast.success(`${bmi} is Underweight`);
    } else if (bmi >= 18.5 && bmi < 24.9) {
        setBmiMessage('Normal weight');
        toast.success(`${bmi} is Normal weight`);
    } else {
        setBmiMessage('Overweight/Obesity');
        toast.success(`${bmi.toFixed(2)} is Overweight/Obesity`);
    }
  };

  const resetInputs = () => {
      setHeight('');
      setWeight('');
      setBmiValue(null);
      setBmiMessage('');
  };

  return (
    <React.Fragment>
    <IonApp>
        <IonMenu side="start" contentId="main-content">
            <IonHeader>
                <IonToolbar color="danger" className="flex items-center p-4">
                    <IonAvatar>
                        <img src={Logo} alt="Logo" />
                    </IonAvatar>
                    <IonTitle className="ml-2 text-lg font-bold">MOHAMED LAAGUILI</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList>
                    <IonItem>
                        <IonLabel>Developer Info</IonLabel>
                        <IonButton fill="clear" href="http://laaguili.epizy.com" target="_blank">
                            Visit Profile
                        </IonButton>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Contact Us</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>About the App</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonMenu>

        <IonContent id="main-content" className="bg-gray-100">
            <IonHeader>
                <IonToolbar color="danger">
                    <IonMenuToggle slot="start">
                        <IonButton fill="clear">
                            <IonIcon icon={menuOutline} />
                        </IonButton>
                    </IonMenuToggle>
                    <IonTitle>BMI Calculator</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonGrid>
                  <IonRow>
                    <IonCol>
                        <InputControles selectedValue={selectedUnit} onUnitChange={setSelectedUnit} />
                    </IonCol>
                  </IonRow>
                  <IonRow className="ion-justify-content-center">
                      <IonCol size="12" sizeMd="6" className="ion-text-center">
                          <IonItem className="mb-4">
                              <IonLabel position="fixed">Height ({selectedUnit === 'mkg' ? 'cm' : 'ft'})</IonLabel>
                              <IonInput
                                  type="number"
                                  value={height}
                                  onIonChange={(e) => setHeight(e.detail.value!)}
                                  placeholder={`Enter height in ${selectedUnit === 'mkg' ? 'cm' : 'ft'}`}
                                  clearInput
                                  className="border border-gray-300 rounded-md p-2"
                              />
                          </IonItem>
                          <IonItem className="mb-4">
                              <IonLabel position="fixed">Weight ({selectedUnit === 'mkg' ? 'kg' : 'lbs'})</IonLabel>
                              <IonInput
                                  type="number"
                                  value={weight}
                                  onIonChange={(e) => setWeight(e.detail.value!)}
                                  placeholder={`Enter weight in ${selectedUnit === 'mkg' ? 'kg' : 'lbs'}`}
                                  clearInput
                                  className="border border-gray-300 rounded-md p-2"
                              />
                          </IonItem>
                          <IonRow className="mb-4">
                              <IonCol>
                                  <IonButton expand="block" color="secondary" onClick={calculateBMI}>
                                      <IonIcon icon={calculatorOutline} slot="start" />
                                      Calculate
                                  </IonButton>
                              </IonCol>
                              <IonCol>
                                  <IonButton expand="block" color="medium" onClick={resetInputs}>
                                      <IonIcon icon={refreshOutline} slot="start" />
                                      Reset
                                  </IonButton>
                              </IonCol>
                          </IonRow>

                          {bmiValue !== null && (
                              <div className="result mt-4">
                                  <h2 className="text-xl font-semibold">Your BMI is: {bmiValue}</h2>
                                  <p>{bmiMessage}</p>
                              </div>
                          )}
                      </IonCol>
                  </IonRow>
                </IonGrid>
            </IonContent>
        </IonContent>
    </IonApp>
    </React.Fragment>
  );
};

export default App;


