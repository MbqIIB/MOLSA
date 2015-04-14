
package curam.molsa.test.base;


import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Properties;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.SpringLayout;


/**
 * A dialog which may run before a test is executed, to present the developer
 * with execution options.
 */
public class TestStartupDialog extends JDialog {

  private class OkListener implements ActionListener {

    public void actionPerformed(ActionEvent e) {
      okPressed = true;
      commitData = (endTransactionComboBox.getSelectedIndex() == 1);
      displayDecisions = displayDecisionsCheckBox.isSelected();
      displayEvidence = displayEvidenceCheckBox.isSelected();
      quickMode = (executionModeComboBox.getSelectedIndex() == 1);
      traceRules = traceRulesCheckBox.isSelected();
      traceLevel = traceLevelComboBox.getSelectedItem().toString();

      setBooleanProperty(COMMIT_DATA, commitData);
      setBooleanProperty(DISPLAY_DECISIONS, displayDecisions);
      setBooleanProperty(DISPLAY_EVIDENCE, displayEvidence);
      setBooleanProperty(QUICK_MODE, quickMode);
      setBooleanProperty(TRACE_RULES, traceRules);
      properties.setProperty(TRACE_LEVEL, traceLevel);

      dispose();
    }

  }


  private class CancelListener implements ActionListener {

    public void actionPerformed(ActionEvent e) {
      okPressed = false;
      dispose();
    }

  }

  // UI controls
  private JLabel displayDecisionsLabel;

  protected JCheckBox displayDecisionsCheckBox;

  private JLabel displayEvidenceLabel;

  protected JCheckBox displayEvidenceCheckBox;

  private JLabel endTransactionLabel;

  protected JComboBox endTransactionComboBox;

  private JLabel executionModeLabel;

  protected JComboBox executionModeComboBox;

  private JLabel traceRulesLabel;

  protected JCheckBox traceRulesCheckBox;

  private JLabel traceLevelLabel;

  protected JComboBox traceLevelComboBox;

  private JButton okButton;

  private JButton cancelButton;

  protected boolean okPressed = false;

  // Settings values
  protected Properties properties;

  protected boolean commitData;

  protected boolean displayDecisions;

  protected boolean displayEvidence;

  protected boolean quickMode;

  protected boolean traceRules;

  protected String traceLevel;

  // Settings constants
  private static final String COMMIT_DATA = "commitData";

  private static final String DISPLAY_DECISIONS = "displayDecisions";

  private static final String DISPLAY_EVIDENCE = "displayEvidence";

  private static final String QUICK_MODE = "quickMode";

  private static final String TRACE_RULES = "traceRules";

  private static final String TRACE_LEVEL = "traceLevel";

  public TestStartupDialog(Properties properties) {
    this.properties = properties;

    commitData = getBooleanProperty(COMMIT_DATA);
    displayDecisions = getBooleanProperty(DISPLAY_DECISIONS);
    displayEvidence = getBooleanProperty(DISPLAY_EVIDENCE);
    quickMode = getBooleanProperty(QUICK_MODE);
    traceRules = getBooleanProperty(TRACE_RULES);
    traceLevel = properties.getProperty(TRACE_LEVEL);

    Container contentPane = this.getContentPane();
    // contentPane.setLayout(new GridLayout(0, 2));

    SpringLayout layout = new SpringLayout();

    contentPane.setLayout(layout);

    displayDecisionsLabel = new JLabel("Display decision XML:", JLabel.RIGHT);
    contentPane.add(displayDecisionsLabel);

    displayDecisionsCheckBox = new JCheckBox();
    displayDecisionsCheckBox.setSelected(displayDecisions);
    contentPane.add(displayDecisionsCheckBox);

    displayEvidenceLabel =
      new JLabel("Display evidence created:", JLabel.RIGHT);
    contentPane.add(displayEvidenceLabel);

    displayEvidenceCheckBox = new JCheckBox();
    displayEvidenceCheckBox.setSelected(displayEvidence);
    contentPane.add(displayEvidenceCheckBox);

    endTransactionLabel = new JLabel("At end of test:", JLabel.RIGHT);
    contentPane.add(endTransactionLabel);

    String[] transactionOptions = { "rollback", "commit" };

    endTransactionComboBox = new JComboBox(transactionOptions);
    endTransactionComboBox.setSelectedIndex(commitData ? 1 : 0);
    contentPane.add(endTransactionComboBox);

    executionModeLabel = new JLabel("Execution mode:", JLabel.RIGHT);
    contentPane.add(executionModeLabel);

    String[] executionOptions = { "strict", "quick" };

    executionModeComboBox = new JComboBox(executionOptions);
    executionModeComboBox.setSelectedIndex(quickMode ? 1 : 0);
    contentPane.add(executionModeComboBox);

    traceRulesLabel = new JLabel("Trace rules:", JLabel.RIGHT);
    contentPane.add(traceRulesLabel);

    traceRulesCheckBox = new JCheckBox();
    traceRulesCheckBox.setSelected(traceRules);
    contentPane.add(traceRulesCheckBox);

    traceLevelLabel = new JLabel("Tracing level:", JLabel.RIGHT);
    contentPane.add(traceLevelLabel);

    String[] traceOptions =
      { "trace_off", "trace_on", "trace_verbose", "trace_ultra_verbose" };

    traceLevelComboBox = new JComboBox(traceOptions);
    if (traceLevel != null) {
      traceLevelComboBox.setSelectedItem(traceLevel);
    }
    contentPane.add(traceLevelComboBox);

    okButton = new JButton("Ok");
    contentPane.add(okButton);
    okButton.addActionListener(new OkListener());

    cancelButton = new JButton("Cancel");
    contentPane.add(cancelButton);
    cancelButton.addActionListener(new CancelListener());

    // Lay out the panel.
    SpringUtilities.makeCompactGrid(contentPane, 7, 2, // rows, cols
      5, 5, // initX, initY
      5, 5); // xPad, yPad

    this.setBounds(400, 400, 320, 250);

  }

  private boolean getBooleanProperty(String name) {
    return Boolean.valueOf(properties.getProperty(name)).booleanValue();
  }

  protected void setBooleanProperty(String name, boolean value) {
    properties.setProperty(name, String.valueOf(value));
  }

  public boolean okPressed() {
    return okPressed;
  }

  public boolean commitData() {
    return commitData;
  }

  public boolean displayDecisions() {
    return displayDecisions;
  }

  public boolean displayEvidence() {
    return displayEvidence;
  }

  public boolean quickMode() {
    return quickMode;
  }

  public boolean traceRules() {
    return traceRules;
  }

  public String traceLevel() {
    return traceLevel;
  }

}
