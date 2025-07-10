import React, { useState, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  // Change initial state back to false
  const [isOpen, setIsOpen] = useState(false);

  // Add state to track first interaction
  const [hasInteracted, setHasInteracted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState("initial");
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState({
    option: "",
    configuration: "",
    phone: "",
    name: "",
    date: "",
  });

  // Modify handleDateSubmit to skip time selection
  const handleDateSubmit = () => {
    if (tempDate) {
      setUserData((prev) => ({ ...prev, date: tempDate }));
      addMessage(tempDate, true);
      addMessage("Great, Have you ever visited our project before?");
      setCurrentStep("visited");
    }
  };

  // Update handleNameSubmit for form submission
  const handleNameSubmit = async (name) => {
    setUserData((prev) => ({ ...prev, name }));
    addMessage(name, true);
    addMessage("Thank you !  Our team will connect with you shortly.");
    setCurrentStep("complete");

    // Prepare data for submission
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Phone", userData.phone);
    formData.append("Option", userData.option);
    formData.append("Configuration", userData.configuration);
    formData.append("Address", userData.configuration);
    if (
      userData.option === "Book Site Visit" ||
      userData.option === "Online Video Presentation"
    ) {
      formData.append("Date", userData.date);
    }

    const crmData = {
      name: name,
      phone: userData.phone,
      listId: "68578e1ae7cfbf2d47b7d334",
      redirect: "",
      email: userData.configuration,
      companyName: userData.option,
      address: userData.date,
    };

    try {
      // Send to Google Sheets
      await fetch(
        "https://script.google.com/macros/s/AKfycbyHTkyuEubDgvaIcNJyny-FvS9CBJSb1302TO6aBY-b7stUW4o1eBkW0H39v9vqfWflCw/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      // Send to CRM
      await fetch(
        "https://enterprise.godial.cc/meta/api/externals/contact/add?access_token=nLWC3eZkuDXNbcElB7wXENJZCMM15hmG7GnDJKs6Zdcxqbh4AHq7o24nAiD43K0e",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crmData),
        }
      );
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const initialOptions = [
    "Pricing & Plans",
    "Amenities",
    "Brochure",
    "Book Site Visit",
    "Online Video Presentation",
    "Get a call back",
  ];

  const configurations = ["1 BHK", "2 BHK"];

  const addMessage = (text, isUser = false) => {
    setMessages((prev) => [...prev, { text, isUser }]);
  };

  // Add this with other state declarations at the top
  const [hasVisited, setHasVisited] = useState(null);

  // Update handleOptionSelect function
  const handleOptionSelect = (option) => {
    setUserData((prev) => ({ ...prev, option }));
    addMessage(option, true);

    if (
      option === "Book Site Visit" ||
      option === "Online Video Presentation"
    ) {
      addMessage("Please select your preferred date for the site visit:");
      setCurrentStep("date");
    } else {
      addMessage("Great, Have you ever visited our project before?");
      setCurrentStep("visited");
    }
  };

  // Update the tempDate state initialization
  const [tempDate, setTempDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tempTime, setTempTime] = useState("15:00"); // Add default time state

  // Modify handleDateSelect function
  const handleDateSelect = (date) => {
    setTempDate(date);
  };

  const handleTimeSelect = (time) => {
    setTempTime(time);
    if (time.includes(":")) {
      const formattedTime = time.toString().padStart(5, "0");
      setUserData((prev) => ({ ...prev, time: formattedTime }));
      addMessage(formattedTime, true);
      addMessage("Great, Have you ever visited our project before?");
      setCurrentStep("visited");
    }
  };

  // Add new handler function after handleOptionSelect
  const handleVisitResponse = (response) => {
    setHasVisited(response);
    addMessage(response ? "Yes" : "No", true);
    setCurrentStep("configuration");
    addMessage("Please select your preferred configuration:");
  };

  const handleConfigurationSelect = (config) => {
    setUserData((prev) => ({ ...prev, configuration: config }));
    addMessage(config, true);
    setCurrentStep("phone");
    addMessage("Nice choice!");
    addMessage("May I have your mobile number please");
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handlePhoneSubmit = (phone) => {
    if (validatePhone(phone)) {
      setUserData((prev) => ({ ...prev, phone }));
      addMessage(phone, true);
      setCurrentStep("name");
      addMessage("Your name please");
      setUserInput("");
    } else {
      addMessage("Please enter a valid 10-digit phone number.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    switch (currentStep) {
      case "phone":
        handlePhoneSubmit(userInput);
        break;
      case "name":
        handleNameSubmit(userInput);
        break;
      default:
        break;
    }
  };

  // Add this at the top with other state declarations
  const [audio] = useState(new Audio("/sounds/notification.wav"));

  // Update handleChatbotOpen to include sound
  const handleChatbotOpen = () => {
    if (!isOpen) {
      audio.currentTime = 0; // Reset audio to start
      audio.play().catch((error) => console.log("Audio playback prevented"));
      setIsOpen(true);
      setHasInteracted(true);
    }
  };

  // Update the useEffect for initial load and refresh
  useEffect(() => {
    const playSound = () => {
      audio.currentTime = 0;
      audio.play().catch((error) => console.log("Audio playback prevented"));
      setIsOpen(true);
    };

    // Initial load with delay
    const timer = setTimeout(playSound, 2000);

    // Handle page reload
    window.onload = () => {
      audio.currentTime = 0;
      audio.play().catch((error) => console.log("Audio playback prevented"));
      setIsOpen(true);
    };

    return () => {
      clearTimeout(timer);
      window.onload = null;
    };
  }, [audio]);

  // Visibility change effect
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const audio = new Audio("/sounds/notification.wav");
        audio.play().catch((error) => console.log("Audio playback prevented"));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessage(
        "Hey, I am Vaishnavi Singh ! Welcome to Arihant Anaika Project."
      );
    }
  }, [isOpen]);

  // Add this with other state declarations
  const messagesEndRef = React.useRef(null);

  // Add this new function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Add this effect to handle scrolling
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
        <div className="chatbot-toggle" onClick={handleChatbotOpen}>
          <svg className="curved-text" viewBox="0 0 200 200">
            <path
              id="curve"
              d="M 40,100 A 55,55 0 0,1 160,100"
              fill="transparent"
            />
            <text className="curved-text-content">
              <textPath
                href="#curve"
                startOffset="50%"
                text-anchor="middle"
                side="left"
              >
                  We Are Here 🤚
              </textPath>
            </text>
          </svg>
          <img
            src="/images/chat-profile.gif"
            alt="Chat"
            className="chat-profile"
          />
        </div>

        {isOpen && (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <img
                src="/images/chat-profile.gif"
                alt="Agent"
                className="agent-profile"
              />
              <div className="agent-info">
                <h3>Vaishnavi Singh</h3>
              </div>
              <button className="close-button" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.isUser ? "user" : "bot"}`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />

              {currentStep === "initial" && (
                <div className="options-container">
                  {initialOptions.map((option, index) => (
                    <button
                      key={index}
                      className="option-button"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentStep === "date" && (
                <div className="options-container">
                  <input
                    type="date"
                    className="date-picker"
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => handleDateSelect(e.target.value)}
                    value={tempDate}
                    placeholder="MM/DD/YYYY"
                  />
                  <button
                    className="option-button"
                    onClick={handleDateSubmit}
                    disabled={!tempDate}
                  >
                    Confirm Date
                  </button>
                </div>
              )}

              {currentStep === "time" && (
                <div className="options-container">
                  <input
                    type="time"
                    className="time-picker"
                    min="09:00"
                    max="18:00"
                    step="1800"
                    value={tempTime}
                    onBlur={(e) => handleTimeSelect(e.target.value)}
                    onChange={(e) => setTempTime(e.target.value)}
                  />
                </div>
              )}

              {/* Add the visited step options here */}
              {currentStep === "visited" && (
                <div className="options-container">
                  <button
                    className="option-button"
                    onClick={() => handleVisitResponse(true)}
                  >
                    Yes
                  </button>
                  <button
                    className="option-button"
                    onClick={() => handleVisitResponse(false)}
                  >
                    No
                  </button>
                </div>
              )}

              {currentStep === "configuration" && (
                <div className="options-container">
                  {configurations.map((config, index) => (
                    <button
                      key={index}
                      className="option-button"
                      onClick={() => handleConfigurationSelect(config)}
                    >
                      {config}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {(currentStep === "phone" || currentStep === "name") && (
              <form onSubmit={handleSubmit} className="chatbot-input">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={
                    currentStep === "phone"
                      ? "Enter your phone number"
                      : "Enter your name"
                  }
                />
                <button type="submit">Send</button>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
