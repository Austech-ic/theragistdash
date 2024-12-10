import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import { CopilotPopup } from "@copilotkit/react-ui";

export function CopilotKitWrapper({ children }: { children: React.ReactNode }) {
  
  return (
    <CopilotKit
      showDevConsole={false}
      publicApiKey="ck_pub_dcf10695abec87841e161633d7930eae"
    >
      {children}
    
    </CopilotKit>
  );
}