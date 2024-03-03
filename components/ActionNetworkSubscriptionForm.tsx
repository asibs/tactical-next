"use client";

import React from "react";
import { useState, useRef } from "react";
import { useScript } from "@/utils/useScript";

export default function ActionNetworkSubscriptionForm() {
  const [isLoading, setIsLoading] = useState(true);

  const ref = useRef<HTMLDivElement>(null);
  useScript(
    "https://actionnetwork.org/widgets/v5/form/stop-the-tories?format=js&source=widget",
    () => {
      console.log("ActionNetwork script loaded");
      setIsLoading(false);
    },
    ref,
  );

  return (
    <>
      <link
        href="https://actionnetwork.org/css/style-embed-whitelabel-v3.css"
        rel="stylesheet"
        type="text/css"
      />

      <div id="can-form-area-stop-the-tories" style={{ width: "100%" }}>
        {/* this div is the target for our HTML insertion */}
      </div>

      {isLoading && (
        <div id="action-network-preload">
          <p>
            Sign-up form not here?
            <br />
            Wait a moment, or try refreshing the page.
          </p>
        </div>
      )}

      <style global jsx>{`
        /************************/
        /*****ACTIONNETWORK******/
        /*********EMBEDS*********/
        /************************/

        /* CONTAINING STYLES */
        /* REMOVE PADDING */
        #can_embed_form #action_info {
          display: none !important;
        }

        /* HIDE HEADERS and 'sponsored by forward democracy' TAGLINE */
        #can_embed_form h2,
        #can_embed_form h4,
        .action_info_user {
          display: none !important;
        }

        /*LABELS*/
        #can_embed_form label {
          font-size: 18px !important;
        }
        #can_embed_form label.floatlabel-label-active {
          display: none !important;
        }

        /* HIDE LABELS */
        #can_embed_form .control-label,
        #can_embed_form .affirmative_note {
          display: none !important;
        }

        /* USE FORM ID TO APPLY OPT-IN HIDING ONLY ON NEWSLETTER SIGNUP FORMS */
        #can_embed_form .controls.check_radio_field label:nth-child(2) {
          display: none !important;
        }

        /* LAYOUT FORMATTING */
        #can_embed_form #d_sharing {
          border-top: none !important;
          padding: 0 0 0 0 !important;
        }

        #can_embed_form #d_sharing ul {
          margin-top: 0 !important;
        }

        /* stop columns */
        #can_embed_form.can_float #form_col1,
        #can_embed_form.can_float #form_col2 {
          float: none !important;
          width: 100% !important;
        }

        /*INPUTS*/
        #can_embed_form input[type="text"],
        #can_embed_form input[type="email"] {
          border-radius: 4px !important;
          padding: 1.4rem 1rem !important;
        }

        #can_embed_form .can_select {
          color: #ffffff !important;
          background-color: #333333 !important;
          border-radius: 4px !important;
        }

        /*ERROR COLOURS*/
        #can_embed_form .check_radio_field label.error_checkbox {
          color: #ff66ff !important;
        }
        #can_embed_form input.error_input {
          border-color: #ff66ff !important;
          box-shadow:
            0 0 0 2px #ff66ff inset,
            0 0 4px 0 #ff66ff inset !important;
        }

        /* FORM BUTTON STYLING */
        .can_button,
        #donate_auto_modal input[type="submit"],
        #donate_auto_modal .button,
        #donate_make_recurring_modal input[type="submit"],
        #donate_make_recurring_modal .button,
        #can_embed_form input[type="submit"],
        #can_embed_form .button {
          background-color: #ff66ff !important;
          color: #ffffff !important;
          padding: 0.4em 1rem !important;
          border: 0 !important;
          border-radius: 8px !important;
          font-size: 1.2em !important;
          font-weight: 600 !important;
          text-transform: uppercase !important;
          font-family: inherit !important;
          letter-spacing: 0.4px !important;
          /*display: inline-block !important;
width: initial !important;
max-width: initial !important;*/
          display: -webkit-flex !important;
          display: flex !important;
          -webkit-justify-content: center !important;
          justify-content: center !important;
        }

        /* MOVE COUNTRY LINK TO RIGHT */
        #can_embed_form .international_link {
          display: -webkit-flex !important;
          display: flex !important;
          -webkit-justify-content: end !important;
          justify-content: end !important;
          opacity: 0.7 !important;
        }

        #can_embed_form .js-international_link_country {
          margin-left: 0.2rem !important;
        }

        #can_embed_form input[type="submit"]:hover,
        #can_embed_form .button:hover {
          background-color: #ff99ff !important;
        }

        /* SUBMIT THANKYOU STYLING */
        .can_thank_you_wrap h2,
        .can_thank_you_wrap h4 {
          display: block !important;
        }
        .can_thank_you_wrap div#can_thank_you {
          background-color: #fff !important;
        }
        .can_thank_you_wrap #action_info {
          display: none;
        }

        /*WELCOME BACK MESSAGE*/
        #can_embed_form #action_welcome_message #action_welcome_message_inner {
          background-color: #333333 !important;
          padding: 1.4rem !important;
          border: none !important;
          font-size: 17px !important;
        }

        /************************/
        /*****ACTIONNETWORK******/
        /*********EMBEDS*********/
        /************************/
      `}</style>

      {/* this script will populate the #can-form-area-stop-the-tories div, but needs to be loaded after other content */}
      <div ref={ref}></div>
    </>
  );
}
